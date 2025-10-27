$Base = "v0.3.6"
$Head = "develop"
$Out  = "changes-$Head-vs-$Base.md"

git fetch --all --tags | Out-Null

$commits  = git log "$Base..$Head" --date=short --pretty="* %s (%h) - %an, %ad" | Out-String
$diffstat = git diff --stat "$Base..$Head" | Out-String
$diff     = git diff "$Base..$Head" | Out-String

$content = @()
$content += "# Changes $Head vs $Base"
$content += ""
$content += "## Commits"
$content += ""
$content += $commits.TrimEnd()
$content += ""
$content += "## Diffstat"
$content += ""
$content += '```'
$content += $diffstat.TrimEnd()
$content += '```'
$content += ""
$content += "## Full diff"
$content += ""
$content += '```diff'
$content += $diff.TrimEnd()
$content += '```'

Set-Content -Path $Out -Value ($content -join [Environment]::NewLine) -Encoding utf8
