# Post-MVP Features & Enhancements

## Premium Upload System - Professional Image Upload

### Current Problem
- Unprofessional Dropbox link (`https://www.dropbox.com/request/XLF5Z1TW1S9qHDYk2Phc`)
- External dependency on personal Dropbox
- Poor user experience
- No upload progress feedback

### Simple Architecture Plan (NO OVER-ENGINEERING)

#### 1. File Storage Solution
**Decision: Hetzner Server + Simple File System**
- Use existing Hetzner server (167.235.233.90)
- Simple directory structure: `/uploads/premium/{session_id}/`
- No complex CDN needed initially
- Direct file system storage (cheap & reliable)

**Why NOT Firebase/Supabase:**
- Current stack is FastAPI + Hetzner
- Adding third-party increases complexity
- File system storage is sufficient for MVP+
- Can migrate later if needed

#### 2. Database Requirements
**Decision: NO database needed initially**
- Store upload metadata as JSON files alongside images
- Format: `{session_id}.json` with upload details
- Simple file-based tracking sufficient for start
- Can add MongoDB Atlas later for analytics

**Data Flow:**
```
1. User uploads → Hetzner `/uploads/premium/{session_id}/`
2. Create metadata → `{session_id}.json`
3. Email notification with session_id
4. Manual processing workflow
```

#### 3. Implementation Plan

##### Backend (FastAPI)
```python
# New endpoint: POST /api/upload/premium
- Accept multiple files (max 5)
- Generate unique session_id
- Store in /uploads/premium/{session_id}/
- Create metadata JSON
- Send email notification
```

##### Frontend (React)
```tsx
// Replace PremiumUploadScreen.tsx Dropbox link
- Modern drag & drop zone
- File preview before upload
- Progress bar during upload
- Success confirmation
```

##### Nginx Configuration
```nginx
# Add file upload limits
client_max_body_size 50M;
```

#### 4. Technical Specifications

**File Handling:**
- Max file size: 10MB per image
- Max total: 5 images per session
- Allowed formats: JPG, PNG, HEIC
- Auto-resize to max 2048px width

**Security:**
- Generate secure session IDs (UUID4)
- Validate file types server-side
- Rate limiting on upload endpoint
- Clean up old uploads (30-day retention)

**Error Handling:**
- Network failures → auto-retry
- File too large → clear error message
- Server full → graceful fallback

#### 5. Implementation Steps

1. **Backend Upload Endpoint** (2 hours)
   - FastAPI route with file handling
   - Directory creation & metadata storage

2. **Frontend Upload Component** (3 hours)
   - Replace Dropbox link with upload zone
   - Progress feedback & error handling

3. **Email Integration** (1 hour)
   - Notification system for new uploads
   - Include session_id in email

4. **Hetzner Server Setup** (1 hour)
   - Create upload directories
   - Set proper permissions
   - Configure Nginx

**Total Effort: ~7 hours**

#### 6. Future Enhancements (Post-Implementation)

**Phase 2:**
- MongoDB Atlas integration for analytics
- Upload history in user dashboard
- Automatic image optimization

**Phase 3:**
- AI-powered image quality checks
- Integration with premium analysis pipeline
- Real-time processing status

### Benefits of This Approach
- ✅ **Simple**: Uses existing infrastructure
- ✅ **Professional**: Custom domain upload experience
- ✅ **Fast**: No third-party API dependencies
- ✅ **Cost-effective**: No additional cloud storage costs
- ✅ **Maintainable**: Minimal complexity increase
- ✅ **Scalable**: Can enhance incrementally

### Migration Path
Current → File-based → MongoDB Atlas (if needed)
- Start simple with file system
- Add database when traffic justifies complexity
- Keep upgrade path open

---

*Plan follows "Keep it Simple" principle - solve the immediate problem (unprofessional Dropbox) with minimal complexity while maintaining upgrade flexibility.*