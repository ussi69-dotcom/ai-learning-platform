ARG LLAMA_CPP_REF=8f48807380305a5985df78f67e29862664c9afec

FROM ubuntu:24.04 AS build

ARG LLAMA_CPP_REF
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        git \
        cmake \
        build-essential \
        pkg-config \
        libcurl4-openssl-dev \
        libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/ggml-org/llama.cpp /src/llama.cpp
WORKDIR /src/llama.cpp
RUN git checkout ${LLAMA_CPP_REF}

RUN cmake -B build \
    -DGGML_BLAS=ON \
    -DGGML_BLAS_VENDOR=OpenBLAS \
    -DGGML_NATIVE=ON \
    -DLLAMA_BUILD_SERVER=ON
RUN cmake --build build --target llama-server -j$(nproc)

FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libopenblas0 \
        libstdc++6 \
        libgomp1 \
        libcurl4 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /src/llama.cpp/build/bin/llama-server /app/llama-server
COPY --from=build /src/llama.cpp/build/bin/libggml*.so* /app/
COPY --from=build /src/llama.cpp/build/bin/libllama*.so* /app/
COPY --from=build /src/llama.cpp/build/bin/libmtmd*.so* /app/

ENV LD_LIBRARY_PATH=/app
WORKDIR /app
ENTRYPOINT ["/app/llama-server"]
