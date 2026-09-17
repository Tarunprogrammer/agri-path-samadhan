
# Plan: Integrate LLaMA/Mistral via Ollama API

## Overview
Replace the current Lovable AI integration with your self-hosted Ollama/Mistral API. The edge function will call your ngrok-exposed FastAPI endpoint instead of Lovable AI gateway.

## Architecture

```text
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Lovable App    │────▶│  Edge Function   │────▶│  Your ngrok URL │
│  (Frontend)     │     │  (chat)          │     │  FastAPI Bridge │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  Ollama Server  │
                                                 │  (Mistral)      │
                                                 │  localhost:11434│
                                                 └─────────────────┘
```

## What You Need to Have Running

Before the integration works, you must have:
1. Ollama installed with Mistral model (`ollama pull mistral`)
2. FastAPI bridge running (`uvicorn main:app --host 0.0.0.0 --port 8000`)
3. ngrok tunnel active (`ngrok http 8000`)

## Implementation Steps

### Step 1: Add External API URL Secret
- Add a secret `MISTRAL_API_URL` to store your ngrok URL (e.g., `https://abcd1234.ngrok-free.app`)
- This allows you to update the URL when ngrok restarts without code changes

### Step 2: Update Edge Function
**File: `supabase/functions/chat/index.ts`**

Changes:
- Remove Lovable AI gateway call
- Call your external Mistral API endpoint instead
- Adapt request/response format to match your FastAPI bridge
- Change from streaming to non-streaming (Ollama's generate endpoint returns complete response)
- Add proper error handling for external API failures

New logic:
```text
1. Receive user message
2. Build prompt with Krushi Mitra system context
3. POST to {MISTRAL_API_URL}/chat with {"question": prompt}
4. Return {"answer": response} from Mistral
```

### Step 3: Update Frontend Chat Hook
**File: `src/hooks/useAIChat.ts`**

Changes:
- Switch from SSE streaming parsing to simple JSON response handling
- The Ollama API returns complete response (not streamed), so we get full answer at once
- Simplify the response handling logic

### Step 4: Update Chat UI Component  
**File: `src/components/community/AIChatAssistant.tsx`**

Changes:
- Update subtitle to reflect "Powered by LLaMA/Mistral"
- No functional changes needed (UI remains the same)

## Technical Details

### Edge Function Request Format
```json
{
  "question": "Combined system prompt + user question"
}
```

### Edge Function Response Format  
```json
{
  "answer": "Mistral's response text"
}
```

### System Prompt (embedded in edge function)
The Krushi Mitra persona will be prepended to every user question:
- Expert farming assistant for Indian farmers
- Provides advice on crops, diseases, schemes, market prices
- Responds in user's language when asked

## Viva/Submission Statement
As per your requirement, the implementation enforces:
- "LLaMA/Mistral is the ONLY intelligence layer"
- "Lovable is used only for UI and workflow orchestration"
- "Without Mistral response, no output is generated"

## Files to Modify
| File | Change |
|------|--------|
| `supabase/functions/chat/index.ts` | Replace Lovable AI with Mistral API call |
| `src/hooks/useAIChat.ts` | Switch from streaming to simple JSON response |
| `src/components/community/AIChatAssistant.tsx` | Update branding to show "Powered by LLaMA/Mistral" |

## Configuration Required
You will need to provide your ngrok URL as a secret (`MISTRAL_API_URL`) when prompted.
