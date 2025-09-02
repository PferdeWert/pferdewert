FROM python:3.11-slim

WORKDIR /app

# Install pipx
RUN pip install pipx

# Set environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json
ENV GOOGLE_PROJECT_ID=""

# Install Google Analytics MCP
RUN pipx install analytics-mcp

# Add pipx bin to PATH
ENV PATH="/root/.local/bin:$PATH"

# Expose the MCP server port (if needed)
EXPOSE 8080

# Keep container running for MCP connection
CMD ["tail", "-f", "/dev/null"]