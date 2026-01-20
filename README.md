## Features

- User authentication with **JWT** and **cookies**  
- Log workouts with:
  - Title
  - Duration (minutes)
  - Intensity (1–10 scale)
  - Muscle group
  - Date
- Compute **weekly load**: `duration × intensity`  
- Calculate **fatigue risk** (NORMAL, ELEVATED, LOW) based on weekly load comparison  
- Detect **plateaus** when load stays the same for multiple weeks  
- Responsive **Next.js frontend** to view workouts and insights  

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd your-project

2
npm install

3
add 1 env for frontend
NEXT_PUBLIC_API_URL=http://localhost:4000

4
npm start


