$content = [IO.File]::ReadAllText('C:\Users\aksha\.gemini\antigravity-ide\brain\9493400e-8573-4354-b1d5-dfcf2e75129e\.system_generated\steps\161\content.md')

$mjs = [regex]::Matches($content, 'https://[^\s"''<>]+\.mjs[^\s"''<>]*', 'IgnoreCase')
Write-Host "Found $($mjs.Count) MJS URLs:"
$mjs | Select-Object -ExpandProperty Value -Unique | ForEach-Object { Write-Host $_ }
