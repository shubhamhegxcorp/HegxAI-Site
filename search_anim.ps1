$content = [IO.File]::ReadAllText('C:\Users\aksha\.gemini\antigravity-ide\brain\9493400e-8573-4354-b1d5-dfcf2e75129e\.system_generated\steps\161\content.md')

Write-Host "=== ANIMATION MATCHES ==="
[regex]::Matches($content, '.{0,50}animation.{0,50}', 'IgnoreCase') | ForEach-Object { Write-Host $_.Value }

Write-Host "=== CANVAS MATCHES ==="
[regex]::Matches($content, '.{0,50}canvas.{0,50}', 'IgnoreCase') | ForEach-Object { Write-Host $_.Value }

