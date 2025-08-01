# Refactoring Plan: OSTEP Study Helper with TanStack Router

## 1. **Install TanStack Router Dependencies**

- Add @tanstack/react-router and @tanstack/router-vite-plugin
- Update vite.config.ts to include the router plugin

## 2. **Create Route Structure**

```
src/routes/
├── __root.tsx          # Root layout with sidebar
├── index.tsx           # Dashboard (/)
├── chapters/
│   └── $chapterId.tsx  # Dynamic chapter view (/chapters/:chapterId)
└── labs/
    └── $labId.tsx      # Future: dynamic lab sections (/labs/:labId)
```

## 3. **Implement Router Configuration**

- Create routeTree with type-safe routing
- Set up RouterProvider in main.tsx
- Implement route parameters and search params

## 4. **Refactor Components for Routing**

- Update Sidebar to use Link components
- Convert App.tsx to root layout
- Extract dashboard to separate route
- Create chapter route with dynamic params

## 5. **Add Extensible Lab System**

- Create LabProvider context for future lab content
- Design flexible data structure for labs
- Add placeholder route for labs

## 6. **Testing Strategy**

Before each implementation step, I'll create tests to verify:

- Route navigation works correctly
- Dynamic parameters are handled properly
- State persistence across routes
- 404 handling for invalid routes
- Search params for filters/settings

## 7. **Commit Strategy**

- Commit 1: Install dependencies and basic router setup
- Commit 2: Create route structure and root layout
- Commit 3: Implement dashboard and chapter routes
- Commit 4: Create extensible lab system
- Commit 5: Add navigation guards and error boundaries
- Commit 6: Final cleanup and optimizations

## Key Benefits:

- Type-safe routing with full TypeScript support
- Better code organization with file-based routing
- Easy to extend with new routes (labs, etc.)
- Improved URL management and sharing
- Built-in route transitions and loading states
