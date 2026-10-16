$r = Invoke-WebRequest -Uri 'https://avande.framer.website/' -UseBasicParsing
[IO.File]::WriteAllText('d:\hegxai-design-final\scratch_avande.html', $r.Content)
Write-Host "Downloaded size: " $r.Content.Length
