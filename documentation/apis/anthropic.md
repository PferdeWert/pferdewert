# Anthropic API Integration

## Overview

Anthropic API provides Claude AI model integration for PferdeWert.de as a secondary AI service option alongside OpenAI. Claude serves as a fallback or alternative AI engine for horse market value estimation and analysis.

## Configuration

### Environment Variables
```bash
ANTHROPIC_API_KEY=<anthropic_api_key>
```

### Package Dependencies
```json
{
  "anthropic": "^0.25.0"
}
```

## Implementation

### Backend Integration

The Anthropic API is integrated in the FastAPI backend using the official Anthropic Python SDK:

```python
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)
```

### Model Configuration

- **Primary Model**: Claude 3 (Haiku, Sonnet, or Opus variants)
- **API Version**: Latest stable version via Python SDK
- **Response Format**: Structured text and JSON for horse valuations
- **Role**: Secondary AI option or primary for specific use cases

## Usage Patterns

### Horse Valuation Analysis

```python
message = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=2000,
    temperature=0.7,
    system="You are an expert horse valuation specialist with deep knowledge of equine markets, breeding, and performance assessment.",
    messages=[
        {
            "role": "user",
            "content": f"Please analyze this horse data and provide a market valuation: {horse_data}"
        }
    ]
)
```

### Structured Analysis

Claude provides comprehensive analysis including:
- Detailed market value assessment
- Breed lineage evaluation
- Performance potential analysis
- Comparative market positioning
- Risk assessment and market trends

## Key Features

- **Advanced Reasoning**: Claude's strong analytical capabilities
- **Long Context**: Handle extensive horse pedigree and performance data
- **Structured Output**: Reliable JSON formatting for valuations
- **Safety Focus**: Built-in safety measures for content generation
- **Constitutional AI**: Aligned responses following helpful principles

## API Capabilities

### Message API
- Multi-turn conversations for detailed analysis
- System prompts for domain expertise
- Function calling for structured data extraction
- Vision capabilities (if using Claude 3 with images)

### Response Controls
- Temperature settings for creativity vs consistency
- Max tokens for response length control
- Stop sequences for precise output formatting
- Top-p sampling for response diversity

## Error Handling

### Common Error Patterns
```python
try:
    response = client.messages.create(...)
except anthropic.RateLimitError as e:
    # Handle rate limiting
    return {"error": "Rate limit exceeded", "retry_after": e.retry_after}
except anthropic.AuthenticationError as e:
    # Handle authentication issues
    return {"error": "Authentication failed"}
except anthropic.APIError as e:
    # Handle general API errors
    return {"error": f"API error: {e.message}"}
```

### Retry Strategy
- Exponential backoff with jitter for rate limits
- Circuit breaker for sustained failures
- Graceful fallback to OpenAI if Claude unavailable

## Security Considerations

- **API Key Management**: Secure storage in environment variables
- **Input Sanitization**: Validate all horse data before processing
- **Output Validation**: Verify response structure and content
- **Rate Limiting**: Respect API quotas and limits

## Performance Optimization

### Request Efficiency
- **Prompt Optimization**: Craft efficient prompts for horse valuation
- **Context Management**: Use conversation history effectively
- **Caching Strategy**: Cache similar valuations to reduce API calls
- **Batch Processing**: Group related requests when possible

### Cost Management
- **Model Selection**: Choose appropriate Claude variant (Haiku/Sonnet/Opus)
- **Token Optimization**: Balance detail with cost efficiency
- **Usage Monitoring**: Track API consumption and costs
- **Smart Routing**: Route to Claude based on request complexity

## Integration Architecture

### Dual AI Setup
```python
async def get_horse_valuation(horse_data: dict, ai_provider: str = "openai"):
    if ai_provider == "anthropic":
        return await call_claude_api(horse_data)
    else:
        return await call_openai_api(horse_data)
```

### Fallback Strategy
- Primary: OpenAI GPT-5
- Secondary: Anthropic Claude
- Automatic failover on service unavailability
- Load balancing based on response time

## Use Cases

### Primary Applications
- **Detailed Analysis**: Complex pedigree and performance evaluation
- **Comparative Studies**: Side-by-side horse comparisons
- **Market Research**: Trend analysis and market insights
- **Quality Assurance**: Cross-validation of OpenAI results

### Specialized Features
- **Conversational Interface**: Multi-turn valuation discussions
- **Document Analysis**: Processing extensive horse documentation
- **Ethical Considerations**: Responsible AI practices in valuations

## Monitoring & Analytics

### Performance Metrics
- Response time and latency
- Token usage per request
- Success/failure rates
- User preference (Claude vs GPT)

### Quality Assessment
- Valuation accuracy comparison
- User satisfaction scores
- Output consistency metrics
- Bias detection and mitigation

## Development Workflow

1. **Prompt Engineering**: Develop Claude-specific prompts
2. **A/B Testing**: Compare Claude vs GPT responses
3. **Integration Testing**: Ensure fallback mechanisms work
4. **Performance Tuning**: Optimize for speed and accuracy

## Best Practices

### Prompt Design
- Leverage Claude's analytical strengths
- Use system prompts for horse expertise
- Structure requests for optimal responses
- Include relevant context efficiently

### Integration Patterns
- Implement proper error handling
- Use async/await for non-blocking calls
- Cache responses appropriately
- Monitor usage and performance

## Future Enhancements

- **Multi-modal Analysis**: Image analysis capabilities
- **Fine-tuning**: Custom models for horse valuation
- **Advanced Functions**: Structured data extraction tools
- **Real-time Processing**: Streaming responses for complex analysis

---

*Documentation generated from codebase analysis*