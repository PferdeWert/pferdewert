# Fast Refresh Prevention Guide

## Quick Checklist - Before Committing

Use this checklist to prevent Fast Refresh infinite loops:

### Objects & Arrays

- [ ] No arrays created in component body passed as props
  ```typescript
  // BAD - creates new array every render
  <Child items={['a', 'b', 'c']} />

  // GOOD - use module constant
  const ITEMS = ['a', 'b', 'c'];
  <Child items={ITEMS} />
  ```

- [ ] No object literals in props
  ```typescript
  // BAD - creates new object every render
  <Child style={{color: 'red'}} />

  // GOOD - use constant
  const STYLES = { red: {color: 'red'} };
  <Child style={STYLES.red} />
  ```

- [ ] No object creation for prop values
  ```typescript
  // BAD
  const data = { name: 'test', value: 123 };
  <Child data={data} />

  // GOOD
  const DATA = { name: 'test', value: 123 };
  <Child data={DATA} />
  ```

### Functions as Props

- [ ] No inline function definitions
  ```typescript
  // BAD - creates new function every render
  <Button onClick={() => console.log('click')} />

  // GOOD - use useCallback
  const handleClick = useCallback(() => console.log('click'), []);
  <Button onClick={handleClick} />
  ```

- [ ] Callbacks have proper dependency arrays
  ```typescript
  // BAD - no dependencies
  const handler = useCallback(() => doSomething(value), []);

  // GOOD - includes all dependencies
  const handler = useCallback(() => doSomething(value), [value]);
  ```

### Side Effects & Logging

- [ ] No console.log/info in component body
  ```typescript
  // BAD - runs every render
  console.log('Component rendered');
  function MyComponent() { ... }

  // GOOD - in useEffect
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  ```

- [ ] No side effects outside useEffect
  ```typescript
  // BAD - runs during render
  function MyComponent(props) {
    info('Props received:', props);
    return ...;
  }

  // GOOD
  function MyComponent(props) {
    useEffect(() => {
      info('Props changed:', props);
    }, [props]);
    return ...;
  }
  ```

### Data Flow

- [ ] Props maintain referential stability
  ```typescript
  // Check: Does this prop change every render?
  // Use React DevTools to compare prop references
  ```

- [ ] No recalculating derived values in body
  ```typescript
  // BAD
  const processedData = data.map(item => ({...item, processed: true}));

  // GOOD - use useMemo if needed
  const processedData = useMemo(
    () => data.map(item => ({...item, processed: true})),
    [data]
  );
  ```

---

## Common Fast Refresh Issues

### Symptom: "Fast Refresh had to perform a full reload"

**Cause:** Props or module state changed unexpectedly
**Solution:** Check for:
1. Arrays/objects created in render body
2. Functions defined in render body
3. Logging/side effects in render path
4. Inline style/className objects

### Symptom: Infinite reload loop

**Cause:** Circular update: prop change → component update → logging → module reload → prop change
**Solution:**
1. Move data to module level
2. Use useEffect for side effects
3. Stabilize object references

### Symptom: Component state keeps resetting

**Cause:** Component unmounting/remounting due to key changes or parent re-renders
**Solution:**
1. Check component keys (lists)
2. Stabilize parent props
3. Verify parent isn't recreating component instances

---

## Debugging Steps

### 1. Check Console for Patterns
```bash
# Look for repeating messages like:
# "Fast Refresh had to perform a full reload"
# "Component mounted"
# "Props received"
```

### 2. Use React DevTools

1. Open React DevTools
2. Select component in tree
3. Check "Props" tab in right panel
4. Edit file and watch if props reference changes
5. If props reference changes but values are same → referential stability issue

### 3. Enable Detailed Logging

In `pages/index.tsx` temporarily:
```typescript
function PferdeWertHomepage() {
  useEffect(() => {
    console.log('HOMEPAGE MOUNTED');
    return () => console.log('HOMEPAGE UNMOUNTED');
  }, []);

  useEffect(() => {
    console.log('HOMEPAGE UPDATED');
  });

  return ...;
}
```

Each "MOUNTED" should appear once per page load. If it appears multiple times → component is re-mounting.

### 4. Check Network Tab

Fast Refresh loop will show:
- Repeated GET requests to `/` (every full reload)
- Status 200 with quick response times

Normal development shows:
- GET request on initial load
- Subsequent changes use HMR (Hot Module Replacement) via WebSocket

---

## Best Practices

### Data Organization

```typescript
// 1. Module-level constants (never change)
const STATIC_DATA = [ ... ];
const CONFIG = { ... };

// 2. Enums/types
type PageType = 'home' | 'about' | 'service';

// 3. Helper functions (no side effects)
function calculateValue(input) { ... }

// 4. Component definition
export default function MyComponent(props) {
  // 5. useState/useContext for component state
  const [state, setState] = useState();

  // 6. useMemo for derived values
  const processed = useMemo(() => processData(state), [state]);

  // 7. useCallback for handler functions
  const handleClick = useCallback(() => { ... }, [deps]);

  // 8. useEffect for side effects ONLY
  useEffect(() => {
    // Side effects here
  }, [deps]);

  // 9. Render
  return ...;
}
```

### Files Prone to This Bug

Watch these components especially:
- Homepage components
- Schema/SEO components
- Config/settings components
- List components with inline data

---

## References

- Next.js Fast Refresh: https://nextjs.org/docs/basic-features/fast-refresh
- React Hooks Rules: https://react.dev/warnings/invalid-hook-call-warning
- Referential Equality: https://react.dev/learn/will-my-component-bell-reset-its-state

---

## Related Issues Fixed

- FAST_REFRESH_LOOP_ROOT_CAUSE.md - Detailed root cause analysis
- components/PferdeWertReviewSchema.tsx - Fixed in this codebase
- components/ReviewSchema.tsx - Fixed logging pattern
