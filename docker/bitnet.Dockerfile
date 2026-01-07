# BitNet 1.58-bit LLM Runtime
# https://github.com/microsoft/BitNet

FROM ubuntu:22.04

# Prevent interactive prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    git \
    cmake \
    build-essential \
    wget \
    clang-18 \
    libomp-18-dev \
    && ln -s /usr/bin/clang-18 /usr/bin/clang \
    && ln -s /usr/bin/clang++-18 /usr/bin/clang++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Clone BitNet repository
ARG BITNET_REF=main
RUN git clone https://github.com/microsoft/BitNet.git bitnet && \
    cd bitnet && \
    git checkout ${BITNET_REF}

# Build BitNet runtime
WORKDIR /app/bitnet
RUN python3 setup_env.py --hf-repo HF1BitLLM/Llama3-8B-1.58-100B-tokens -q i2_s

# Install Python dependencies for API wrapper
RUN pip3 install --no-cache-dir fastapi uvicorn[standard] pydantic

# Copy API wrapper
COPY docker/bitnet_api_wrapper.py /app/api_wrapper.py

# Expose API port
EXPOSE 8080

# Default command (will be overridden in docker-compose with specific model)
CMD ["python3", "/app/api_wrapper.py"]
