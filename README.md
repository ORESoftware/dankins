# dankins

`dankins` turns a small, reviewable JSON contract into a deterministic Jenkins
declarative pipeline. The repository had no previous commits or API; this
initial contract deliberately stays bounded to stage names and shell steps
instead of inventing deployment, credential, or Jenkins-controller ownership.

```sh
node bin/dankins.mjs examples/pipeline.json
```

The renderer validates stage and step counts, rejects invalid names and NUL
bytes, escapes Groovy string boundaries, and prints the Jenkinsfile to stdout.
It never contacts Jenkins, stores credentials, or deploys an artifact. Generated
output enables `disableConcurrentBuilds()` and timestamps by default.

The JSON shape is:

```json
{
  "agent": "any",
  "stages": [
    { "name": "Test", "steps": ["npm test"] }
  ]
}
```

`agent` is exactly `any` or `none`; pipelines contain at most 64 stages and 64
steps per stage. The CLI accepts at most 256 KiB of JSON.

## Verify

```sh
npm test
npm run example
npm pack --dry-run --json
```
