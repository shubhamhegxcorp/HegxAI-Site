$content = [IO.File]::ReadAllText('C:\Users\aksha\.gemini\antigravity-ide\brain\9493400e-8573-4354-b1d5-dfcf2e75129e\.system_generated\steps\161\content.md')

Write-Host "Total length: $($content.Length)"

# Let's extract any mention of animation, keyframes, transitions, background, gradient
$patterns = @('keyframes', 'animation', 'transform', 'backdrop', 'radial-gradient', 'linear-gradient', 'background:', 'background-image', 'svg', 'canvas')
foreach ($p in $patterns) {
    $matches = [regex]::Matches($content, $p, 'IgnoreCase')
    Write-Host "$p : $($matches.Count) matches"
}

# Find all occurrences of background-image or gradient
$bgMatches = [regex]::Matches($content, 'background[^;\}]+', 'IgnoreCase')
Write-Host "Background properties found: $($bgMatches.Count)"
$bgMatches | Select-Object -First 15 | ForEach-Object { Write-Host " - $($_.Value)" }

