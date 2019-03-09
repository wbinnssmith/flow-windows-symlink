# Flow symlink issues on Windows

This repo is a minimal reproduction of an issue Flow has on Windows resolving types in a module pointed at by its real path and by a symlink.

It uses yarn workspaces only to easily create the symlinks cross-platform. There's a package called `ignore_me` that exists only to depend on `test`.

In the test code, the `test` references one of its own modules directly through its realpath, as well as through the symlink established by yarn workspaces.

To prove that the class is identical across realpath and symlink, run the code with `yarn flow-node index.js`.

On Mac and Linux systems `yarn flow` will pass, but on Windows systems it will fail, as flow sees these as different classes. However, at runtime, they are the same.

On Windows `yarn flow` does not pass, while it does on other platforms. On Windows, you receive this:

```js

Error ----------------------------------------------------------------------------------------------- test/index.js:7:14

Cannot assign `a1` to `a2` because `A` [1] is incompatible with `A` [2].

  test/index.js:7:14
  7| let a2: A2 = a1;
                  ^^

References:
  test/index.js:6:9
  6| let a1: A1 = new A1();
             ^^ [1]
  test/index.js:7:9
  7| let a2: A2 = a1;
             ^^ [2]
 ```