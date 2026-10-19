$content = [IO.File]::ReadAllText('C:\Users\aksha\.gemini\antigravity-ide\brain\9493400e-8573-4354-b1d5-dfcf2e75129e\.system_generated\steps\161\content.md')

$scripts = [regex]::Matches($content, 'https://[^\s"''<>]+\.js[^\s"''<>]*', 'IgnoreCase')
Write-Host "Found $($scripts.Count) JS URLs:"
$scripts | Select-Object -ExpandProperty Value -Unique | ForEach-Object { Write-Host $_ }
