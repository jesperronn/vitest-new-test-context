This example shows errors in test related to how event listeners are registered (and shared) between tests.

Here, we create a new listener on `body` in each test, but we don't remove the event listeners after the test is done. This means that the event listeners are shared between tests, and the tests are not isolated.

The repository contains a test that fails because of this issue. The test `test click iconA, iconB` fails because the event listener from the previous test is still active and triggers the event listener in the current test.

The repository supports the issue I created for happy-dom https://github.com/capricorn86/happy-dom/issues/1591

I need help to understand how to fix this issue. Can you help me?

### Test output:

```
npm test

> vitest run


 RUN  v2.1.4 /Users/jesper/src/vitest-new-test-context

stdout | src/bodylistener.test.js > bodylistener > test click iconB, iconA
### testrunIteration: 1
### before passwVal: '' ### value + new:  + B => B
B
### testrunIteration: 2
### before passwVal: 'B' ### value + new: B + A => BA
BA

stdout | src/bodylistener.test.js > bodylistener > body listener > test click iconA, iconB
### testrunIteration: 1
### before passwVal: '' ### value + new:  + A => A
A
### testrunIteration: 2
### before passwVal: 'A' ### value + new: A + A => AA
AA
### testrunIteration: 3
### before passwVal: 'AA' ### value + new: AA + A => AAA
AAA
### testrunIteration: 4
### before passwVal: 'AAA' ### value + new: AAA + B => AAAB
AAAB
### testrunIteration: 5
### before passwVal: 'AAAB' ### value + new: AAAB + B => AAABB
AAABB
### testrunIteration: 6
### before passwVal: 'AAABB' ### value + new: AAABB + B => AAABBB
AAABBB

 ❯ src/bodylistener.test.js (6)
   ❯ bodylistener (6)
     ✓ test click iconB, iconA
     ❯ body listener (5)
       ✓ expect jquery $ to exist
       ↓ test 2 [skipped]
       ↓ test 3 [skipped]
       ↓ test click iconA [skipped]
       × test click iconA, iconB

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/bodylistener.test.js > bodylistener > body listener > test click iconA, iconB
AssertionError: expected 'AAABBB' to be 'AB' // Object.is equality

Expected: "AB"
Received: "AAABBB"

 ❯ src/bodylistener.test.js:81:32
     79|       iconB.click();
     80| 
     81|       expect(passwInput.value).toBe('AB');
       |                                ^
     82|     })
     83| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 2 passed | 3 skipped (6)
   Start at  07:10:12
   Duration  626ms (transform 14ms, setup 0ms, collect 14ms, tests 259ms, environment 105ms, prepare 42ms)
```
