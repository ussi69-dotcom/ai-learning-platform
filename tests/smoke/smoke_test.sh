#!/bin/bash
# Production Smoke Test Suite
# Run after deployment to verify all systems are operational
#
# Usage: ./tests/smoke/smoke_test.sh [BASE_URL]
# Example: ./tests/smoke/smoke_test.sh https://ai-teaching.eu

set -e

# Configuration
BASE_URL="${1:-http://localhost}"
API_URL="${BASE_URL}/api"
TIMEOUT=5

# For localhost testing, allow insecure HTTPS (self-signed certs)
CURL_OPTS="--max-time $TIMEOUT"
if [[ "$BASE_URL" == *"localhost"* ]]; then
    CURL_OPTS="$CURL_OPTS -L -k"  # Follow redirects, allow insecure
fi
PASSED=0
FAILED=0
TESTS=()

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
    TESTS+=("PASS: $1")
}

log_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
    TESTS+=("FAIL: $1")
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_info() {
    echo -e "  → $1"
}

# Test functions
test_frontend() {
    echo ""
    echo "=== Frontend Tests ==="

    # Test homepage loads
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS "$BASE_URL/" 2>/dev/null || echo "000")
    if [[ "$response" =~ ^(200|301|302|307|308)$ ]]; then
        log_pass "Homepage accessible (HTTP $response)"
    else
        log_fail "Homepage not accessible (HTTP $response)"
    fi

    # Test static assets
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS "$BASE_URL/_next/static/" 2>/dev/null || echo "000")
    if [[ "$response" != "000" ]]; then
        log_pass "Static assets served"
    else
        log_fail "Static assets not accessible"
    fi

    # Test login page
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS "$BASE_URL/cs/login" 2>/dev/null || echo "000")
    if [[ "$response" == "200" ]]; then
        log_pass "Login page loads (HTTP $response)"
    else
        log_fail "Login page not accessible (HTTP $response)"
    fi
}

test_backend_health() {
    echo ""
    echo "=== Backend Health Tests ==="

    # Health endpoint
    health_response=$(curl -s $CURL_OPTS "$API_URL/health" 2>/dev/null || echo '{"error": "timeout"}')

    if echo "$health_response" | grep -q '"status":"healthy"'; then
        log_pass "Health endpoint returns healthy"

        # Check individual services (supports both old and new format)
        if echo "$health_response" | grep -q -E '"database":"connected"|"PostgreSQL".*"healthy"'; then
            log_pass "Database connected"
        else
            log_fail "Database not connected"
        fi

        if echo "$health_response" | grep -q -E '"redis":"connected"|"Redis".*"healthy"'; then
            log_pass "Redis connected"
        else
            log_warn "Redis not connected (optional)"
        fi
    else
        log_fail "Health endpoint failed: $health_response"
    fi
}

test_api_endpoints() {
    echo ""
    echo "=== API Endpoint Tests ==="

    # Courses endpoint (requires auth - 401 is expected for unauthenticated)
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS "$API_URL/courses" 2>/dev/null || echo "000")
    if [[ "$response" =~ ^(200|307|401)$ ]]; then
        if [[ "$response" == "401" ]]; then
            log_pass "Courses endpoint requires auth (HTTP 401) - correct"
        else
            log_pass "Courses endpoint accessible (HTTP $response)"
        fi
    else
        log_fail "Courses endpoint failed (HTTP $response)"
    fi

    # News endpoint (public)
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS "$API_URL/news" 2>/dev/null || echo "000")
    if [[ "$response" == "200" ]]; then
        log_pass "News endpoint accessible"

        # Check news has content
        news_count=$(curl -s $CURL_OPTS "$API_URL/news?limit=5" 2>/dev/null | grep -o '"id":' | wc -l)
        if [[ "$news_count" -gt 0 ]]; then
            log_pass "News feed has $news_count items"
        else
            log_warn "News feed empty"
        fi
    else
        log_fail "News endpoint failed (HTTP $response)"
    fi

    # Digest endpoint
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS "$API_URL/digest" 2>/dev/null || echo "000")
    if [[ "$response" == "200" ]]; then
        log_pass "Digest endpoint accessible"
    else
        log_fail "Digest endpoint failed (HTTP $response)"
    fi
}

test_database() {
    echo ""
    echo "=== Database Tests ==="

    # Check news items exist (public endpoint)
    news=$(curl -s $CURL_OPTS "$API_URL/news?limit=100" 2>/dev/null | grep -o '"id":' | wc -l)
    if [[ "$news" -gt 0 ]]; then
        log_pass "Database has $news news items"
    else
        log_warn "No news items in database"
    fi

    # Check health shows DB connected
    db_status=$(curl -s $CURL_OPTS "$API_URL/health" 2>/dev/null | grep -o '"PostgreSQL"' || echo "")
    if [[ -n "$db_status" ]]; then
        log_pass "Database verified via health endpoint"
    else
        log_fail "Database not verified"
    fi
}

test_authentication() {
    echo ""
    echo "=== Authentication Tests ==="

    # Test login endpoint exists
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS -X POST "$API_URL/auth/login" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "username=invalid@test.com&password=invalid" 2>/dev/null || echo "000")

    if [[ "$response" == "401" ]]; then
        log_pass "Login endpoint rejects invalid credentials (HTTP 401)"
    elif [[ "$response" == "422" ]]; then
        log_pass "Login endpoint validates input (HTTP 422)"
    elif [[ "$response" == "429" ]]; then
        log_warn "Login endpoint rate limited (HTTP 429)"
    else
        log_fail "Login endpoint unexpected response (HTTP $response)"
    fi

    # Test register endpoint exists
    response=$(curl -s -o /dev/null -w "%{http_code}" $CURL_OPTS -X POST "$API_URL/auth/register" \
        -H "Content-Type: application/json" \
        -d '{"email":"","password":""}' 2>/dev/null || echo "000")

    if [[ "$response" =~ ^(400|422)$ ]]; then
        log_pass "Register endpoint validates input (HTTP $response)"
    else
        log_fail "Register endpoint unexpected response (HTTP $response)"
    fi
}

test_ssl() {
    echo ""
    echo "=== SSL/Security Tests ==="

    if [[ "$BASE_URL" == https://* ]]; then
        # Check SSL certificate
        ssl_check=$(curl -s -o /dev/null -w "%{ssl_verify_result}" --max-time $TIMEOUT "$BASE_URL" 2>/dev/null || echo "error")
        if [[ "$ssl_check" == "0" ]]; then
            log_pass "SSL certificate valid"
        else
            log_fail "SSL certificate issue (code: $ssl_check)"
        fi

        # Check HSTS header
        hsts=$(curl -s -I --max-time $TIMEOUT "$BASE_URL" 2>/dev/null | grep -i "strict-transport-security" || echo "")
        if [[ -n "$hsts" ]]; then
            log_pass "HSTS header present"
        else
            log_warn "HSTS header missing"
        fi
    else
        log_warn "Skipping SSL tests (not HTTPS)"
    fi
}

# Summary
print_summary() {
    echo ""
    echo "========================================"
    echo "           SMOKE TEST SUMMARY"
    echo "========================================"
    echo -e "Passed: ${GREEN}$PASSED${NC}"
    echo -e "Failed: ${RED}$FAILED${NC}"
    echo "----------------------------------------"

    if [[ $FAILED -gt 0 ]]; then
        echo -e "${RED}SOME TESTS FAILED${NC}"
        echo ""
        echo "Failed tests:"
        for test in "${TESTS[@]}"; do
            if [[ "$test" == FAIL:* ]]; then
                echo "  - ${test#FAIL: }"
            fi
        done
        exit 1
    else
        echo -e "${GREEN}ALL TESTS PASSED${NC}"
        exit 0
    fi
}

# Main
echo "========================================"
echo "    Production Smoke Test Suite"
echo "========================================"
echo "Target: $BASE_URL"
echo "Time: $(date)"
echo "========================================"

test_frontend
test_backend_health
test_api_endpoints
test_database
test_authentication
test_ssl

print_summary
