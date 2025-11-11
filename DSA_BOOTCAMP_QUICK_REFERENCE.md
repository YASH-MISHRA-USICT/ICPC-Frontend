# DSA Bootcamp - Quick Reference Guide

## 🎛️ Configuration Controls

### Toggle DSA Bootcamp Mode
**File**: `src/components/Devcamp/Devcamp.tsx`

```javascript
// Line 28
const DSA_BOOTCAMP_MODE = true;  // Change to false to show all tracks
const SHOW_TASKS = true;          // Change to false to preview without backend
```

### Mode Comparison

| Feature | DSA_BOOTCAMP_MODE = true | DSA_BOOTCAMP_MODE = false |
|---------|-------------------------|---------------------------|
| **Tracks Shown** | DSA only | All 5 tracks (Web, AI/ML, Game, App, DSA) |
| **Title** | "DSA Bootcamp" | "Devcamp" |
| **Duration** | 12 weeks | 5 weeks per track |
| **Theme Color** | Purple | Blue/Green/Red/Purple |
| **Focus** | Interview prep & CP | Project-based learning |

## 📊 Track Data Files

### DSA Track
- **File**: `src/data/tracks/dsaTrack.js`
- **Levels**: 4 (Foundation, Intermediate, Advanced, Expert)
- **Weeks**: 12
- **Problems**: 150+

### Other Tracks (if DSA_BOOTCAMP_MODE = false)
- `src/data/tracks/webDevTrack.js` - Web Development
- `src/data/tracks/aiMlTrack.js` - AI/ML
- `src/data/tracks/gameDevTrack.js` - Game Development
- `src/data/tracks/mobileAppDevTrack.js` - App Development

## 🗄️ Database Mapping

### Profile Field: `coding_track`

| UI Value | Database Value | Track ID |
|----------|----------------|----------|
| Web Development | `"webdev"` | `"web-dev"` |
| AI/ML | `"ai"` | `"ai-ml"` |
| Game Development | `"game"` | `"game-dev"` |
| App Development | `"app"` | `"app-dev"` |
| DSA | `"dsa"` | `"dsa"` |

### Conversion Logic
```javascript
// UI → Database (when saving)
if (trackId === "web-dev") profileTrackValue = "webdev";
if (trackId === "app-dev") profileTrackValue = "app";
if (trackId === "ai-ml") profileTrackValue = "ai";
if (trackId === "game-dev") profileTrackValue = "game";
if (trackId === "dsa") profileTrackValue = "dsa";

// Database → UI (when loading)
if (userTrack === "webdev") mapped = "web-dev";
if (userTrack === "app") mapped = "app-dev";
if (userTrack === "ai") mapped = "ai-ml";
if (userTrack === "game") mapped = "game-dev";
if (userTrack === "dsa") mapped = "dsa";
```

## 📝 Customization Guide

### Change Duration
```javascript
// In dsaTrack.js
export const dsaTrack = {
  totalWeeks: 12,  // Change this number
  // ...
}
```

### Add/Remove Levels
```javascript
// In dsaTrack.js
levels: [
  { level: 1, title: "Foundation", ... },
  { level: 2, title: "Intermediate", ... },
  // Add more levels here
]
```

### Modify Problems Per Week
```javascript
// In each week block
project: {
  title: 'Solve 20 Array Problems',  // Change number
  description: '...',
  coreFeatures: [
    // Add/remove features
  ]
}
```

### Update Resource Links
```javascript
resources: [
  {
    type: 'video',  // 'video', 'pdf', or 'link'
    title: 'Your Title',
    url: 'https://your-url.com',
    description: 'Description'
  }
]
```

## 🎨 UI Customization

### Change Theme Color
```javascript
// In Devcamp.tsx, update the colorMap for purple
colorMap: {
  purple: {
    bg: "bg-purple-500",     // Main background
    text: "text-purple-600", // Light mode text
    border: "border-purple-200", // Light mode border
    hover: "hover:bg-purple-50", // Hover state
  }
}
```

### Modify Stats Cards
```javascript
// In hero section
{[
  { label: "Problems", value: "150+", icon: "🎯" },
  { label: "Weeks", value: "12", icon: "📅" },
  // Add/modify stats here
]}
```

### Change Track Features
```javascript
const trackFeatures = DSA_BOOTCAMP_MODE && track.id === "dsa"
  ? [
      "150+ LeetCode/Codeforces Problems",
      "Interview Preparation",
      // Add more features
    ]
  : [...]
```

## 🔧 Common Tasks

### Add a New Week
1. Open `src/data/tracks/dsaTrack.js`
2. Find the appropriate level
3. Add to the `weeks` array:
```javascript
{
  week: 13,
  topics: ['Topic 1', 'Topic 2'],
  resources: [...],
  project: {...}
}
```

### Change Certificate Requirements
```javascript
// In dsaTrack.js
certification: {
  title: 'DSA Bootcamp Certificate of Excellence',
  requirements: [
    'Complete all 4 levels',
    // Add/modify requirements
  ]
}
```

### Update Submission Requirements
```javascript
submissionRequirements: {
  mandatory: [
    'GitHub repository',
    // Add/modify mandatory items
  ],
  preferred: [
    'Blog posts',
    // Add/modify preferred items
  ]
}
```

## 📈 Analytics & Tracking

### Metrics to Track
1. **Enrollment**: Users who select DSA track
2. **Progress**: Level completion rates
3. **Problems Solved**: Via LeetCode/GFG integration
4. **Contest Participation**: Via Codeforces/CodeChef
5. **Completion**: Final certificate issuance

### Integration Points
```javascript
// When user selects track
await apiService.updateProfile({
  coding_track: "dsa"
});

// Track progress (implement in backend)
// - Level completions
// - Problems solved
// - Contest participation
// - Resource access
```

## 🐛 Troubleshooting

### Track Not Showing
1. Check `DSA_BOOTCAMP_MODE = true`
2. Verify `dsaTrack.js` is imported
3. Check browser console for errors

### Data Not Saving
1. Verify API endpoint is working
2. Check network tab in DevTools
3. Ensure user is authenticated
4. Verify profile structure matches backend

### UI Not Updating
1. Clear browser cache
2. Check if page reload is needed
3. Verify state updates in React DevTools

## 📱 Testing Checklist

- [ ] Track selection works
- [ ] Data saves to backend
- [ ] Curriculum displays correctly
- [ ] All levels expand/collapse
- [ ] Resources links work
- [ ] Projects tab shows correctly
- [ ] Submission requirements visible
- [ ] Certificate info displays
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Loading states show
- [ ] Success messages appear

## 🚀 Deployment Notes

1. **Environment Variables**: None required for DSA track
2. **Build**: Standard React build process
3. **Cache**: Clear CDN cache after deployment
4. **Database**: Ensure `coding_track` field supports "dsa" value
5. **Testing**: Test on staging before production

## 📞 Support

For issues or customization help:
1. Check documentation above
2. Review code comments in files
3. Test in development environment first
4. Document any changes made

---

**Last Updated**: November 10, 2025
**Version**: 1.0.0
