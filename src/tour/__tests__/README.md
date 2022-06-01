### Unit Tests

Unit tests can be run with the command below:

```
yarn run test
```

### Tests for Contract in `index.unit.spec.ts`


```
[Describe]: Checks for creating account

 [Success]: ✔ creates a tour

[Describe]: View a single Tour

 [Success]: ✔ Returns a single tour
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

[Describe]: To purchase a single Tour

 [Success]: ✔ purchases a single tour and returns a response
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

[Describe]: To delete a single Tour

 [Success]: ✔ deletes a single tour and returns a response
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

[Describe]: To like on a single Tour

 [Success]: ✔ likes on a single tour and returns a response
 [Success]: ✔ unlikes on a single tour and returns a response
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

[Describe]: To dislike on a single Tour

 [Success]: ✔ dislikes on a single tour and returns a response
 [Success]: ✔ undislikes on a single tour and returns a response
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

[Describe]: Comment on tour

 [Success]: ✔ comments on tour
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

[Describe]: Rate tour

 [Success]: ✔ rates tour
 [Success]: ✔ Smart contract panics when there's no Tour with such ID

    [File]: src/tour/__tests__/index.unit.spec.ts
  [Groups]: 9 pass, 9 total
  [Result]: ✔ PASS
[Snapshot]: 0 total, 0 added, 0 removed, 0 different
 [Summary]: 17 pass,  0 fail, 17 total
    [Time]: 220.521ms

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  [Result]: ✔ PASS
   [Files]: 1 total
  [Groups]: 9 count, 9 pass
   [Tests]: 17 pass, 0 fail, 17 total
    [Time]: 15046.675ms
✨  Done in 32.52s.

```