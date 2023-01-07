# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I changed the variable name candidate to partitionKey as that what the function returns.
Then  added the event / parameter non existing condition at top and returned trivial key if its true.
This enables to remove any check below for partitionKey not existing, thus that check is removed.

I moved the constants out of the function as they need not be initialized again and again , as they have primitive value , besides it makes the function and test more flexible , as I used the same variables in test files instead of hardcoding. This follows DRY principle.

Then I created a separate function for creating a hash and the same is used in test file.

Then I also moved all the exports needed to the bottom.

And finally added comments for the functions to make them more understandable.

## Test screenshot

![Test](/test.png)
