# OpenAI API Integration

## Overview

OpenAI API serves as the primary AI service for PferdeWert.de, providing GPT-5 model capabilities for generating detailed horse market value estimations and analysis reports.

## Configuration

### Environment Variables
```bash
OPENAI_API_KEY=your_openai_api_key_here
PW_MODEL=gpt-5
```

### Package Dependencies
```json
{
  "openai": "^5.6.0"
}
```

## Implementation

### Frontend Integration

The OpenAI API is integrated using the official OpenAI Node.js SDK:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

### Model Configuration

- **Primary Model**: GPT-5 (configured via PW_MODEL environment variable)
- **API Version**: Using OpenAI SDK v5.6.0
- **Response Format**: Structured JSON for horse valuations

## Usage Patterns

### Horse Valuation Analysis

```typescript
const completion = await openai.chat.completions.create({
  model: process.env.PW_MODEL || 'gpt-4',
  messages: [
    {
      role: 'system',
      content: 'You are an expert horse valuation specialist...'
    },
    {
      role: 'user', 
      content: `Please analyze this horse: ${horseData}`
    }
  ],
  temperature: 0.7,
  max_tokens: 2000,
});
```

### Structured Output

The API likely returns structured data including:
- Market value estimation
- Breed-specific analysis
- Performance potential assessment
- Market trends and comparisons
- Risk factors and considerations

## Key Features

- **Advanced Language Model**: GPT-5 provides state-of-the-art language understanding
- **Domain Expertise**: Trained on extensive horse market data
- **Structured Responses**: Returns JSON-formatted valuation reports
- **Customizable Parameters**: Temperature and token limits for response control
- **Rate Limiting**: Built-in rate limiting compliance

## API Limits & Quotas

- **Rate Limits**: Varies by subscription tier
- **Token Limits**: Configurable max_tokens per request
- **Monthly Usage**: Tracked via OpenAI dashboard
- **Cost Management**: Monitor usage to control costs

## Error Handling

### Common Error Types
```typescript
try {
  const completion = await openai.chat.completions.create({...});
} catch (error) {
  if (error.status === 429) {
    // Rate limit exceeded
    return { error: 'Too many requests. Please try again later.' };
  }
  if (error.status === 401) {
    // Authentication error
    return { error: 'API authentication failed.' };
  }
  // Handle other errors
  return { error: 'Service temporarily unavailable.' };
}
```

### Retry Strategy
- Exponential backoff for rate limit errors
- Immediate retry for network timeouts
- Circuit breaker pattern for repeated failures

## Security Considerations

- **API Key Protection**: Stored as environment variable, never exposed to client
- **Request Validation**: Input sanitization before API calls
- **Response Filtering**: Content moderation for inappropriate responses
- **Audit Logging**: Track API usage and responses

## Performance Optimization

### Request Optimization
- **Token Management**: Optimize prompt length for cost efficiency
- **Response Caching**: Cache similar valuations to reduce API calls
- **Batch Processing**: Group multiple requests when possible
- **Streaming**: Use streaming for long responses

### Cost Management
- **Model Selection**: Use appropriate model for each use case
- **Token Budgeting**: Set max_tokens based on expected response length
- **Usage Monitoring**: Track monthly costs and set alerts
- **Fallback Strategy**: Switch to less expensive models if needed

## Monitoring & Analytics

### Usage Metrics
- Request volume and frequency
- Average response time
- Token consumption per request
- Error rates and types
- Cost per valuation

### Performance Tracking
- Response quality assessment
- User satisfaction scores
- Completion success rates
- Model accuracy metrics

## Prompt Engineering

### System Prompts
Specialized system prompts for:
- Horse breed expertise
- Market analysis techniques
- Valuation methodology
- Regional market variations

### User Input Processing
- Structured data extraction from forms
- Image analysis integration (if applicable)
- Historical data incorporation
- Market condition adjustments

## Development Workflow

1. **Prompt Testing**: Use OpenAI Playground for prompt development
2. **A/B Testing**: Compare different prompt strategies
3. **Response Validation**: Ensure structured output consistency
4. **Cost Optimization**: Monitor and optimize token usage

## Integration Patterns

### Backend Processing
- API calls handled on server-side only
- Secure API key management
- Response validation and formatting
- Database storage of results

### Frontend Display
- Structured presentation of AI analysis
- Loading states during API calls
- Error handling with user feedback
- Progressive disclosure of detailed results

## Best Practices

- Use system prompts to establish context and expertise
- Implement proper error handling and fallbacks
- Monitor usage and costs regularly
- Keep prompts concise but comprehensive
- Validate and sanitize all inputs
- Cache frequently requested analyses
- Implement graceful degradation for API failures

## Future Enhancements

- **Multi-modal Analysis**: Image recognition for horse photos
- **Real-time Market Data**: Integration with live market feeds  
- **Comparative Analysis**: Side-by-side horse comparisons
- **Predictive Analytics**: Future value projections
- **Localization**: Region-specific market expertise

---

*Documentation generated from codebase analysis*