## General workflow summary

1. Create the skeleton of the feature.
2. Implement the feature, using the tests to guide you.
3. Commit the feature by itself.
4. If intending to release, create a release note, carefully deciding if it's a major, minor, or patch release (if adding to a release that is about to happen, add to the existing note)
5. Commit the release note separately from the feature.
6. Create a feature pull request and wait for it to be merged.
7. Run the commit-version-change workflow to create a pull request to change just the version.
8. Merge it in once CI passes.
9. Run the `update.sh` file on @Badstagram's server (I unfortunately cannot automate this step yet).
10. All done!
