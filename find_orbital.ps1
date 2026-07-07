$l = Get-Content "c:\Users\santh\OneDrive\Documents\GitHub\Opptytechhub\index.html" -Encoding UTF8
for($i=0; $i -lt $l.Length; $i++) {
    if($l[$i] -like '*wo-visual*' -or $l[$i] -like '*wo-badge*' -or $l[$i] -like '*wo-container*' -or $l[$i] -like '*wo-rings*') {
        Write-Host "$($i+1): $($l[$i])"
    }
}
