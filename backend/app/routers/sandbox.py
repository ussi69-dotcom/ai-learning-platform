from fastapi import APIRouter, Depends, HTTPException, Request
from app import schemas, models, auth
from app.services.sandbox_service import sandbox_service
from app.limiter import limiter

router = APIRouter(
    prefix="/sandbox",
    tags=["sandbox"],
    dependencies=[Depends(auth.get_current_user)]
)

@router.post("/execute", response_model=schemas.SandboxResponse)
@limiter.limit("10/minute")
def execute_code(
    request: Request,
    payload: schemas.SandboxRequest,
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Execute Python code in a secure sandboxed environment.
    Rate Limited: 10 requests per minute per IP.
    """
    
    result = sandbox_service.run_code(payload.code, payload.language)
    
    if result["status"] == "error" and "Sandbox environment not available" in str(result.get("error", "")):
         raise HTTPException(status_code=503, detail=result["error"])
         
    return result