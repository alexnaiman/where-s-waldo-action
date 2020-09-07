# Where's Waldo Action ๑<{8D-/-<

Action that adds on a random position, line, and file, a Waldo -> ๑<{8D-/-<, reassuring the dev that he will never lose its job thanks to the bugs created.

Where's Waldo Action is an Github action created for the [dev.to](dev.to)'s ActionsHackathon

## Inputs

### `github-token`

*Required* Github token to have access to the rep

## Outputs

It adds ๑<{8D-/-< on a random position, line and file

## Example Usage

```yaml
on: [push]
jobs:
  where_s_waldo_job:
    runs-on: ubuntu-latest
    name: A job to test "Where's Waldo "
    steps:
      - name: Where's Waldo?
        id: waldo
        uses: alexnaiman/where-s-waldo-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
