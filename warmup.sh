#!/bin/bash
# Regenerate meta and home cache for all sites

SITES=(
  "https://liveperformersmeeting.net en it"
  "https://livecinemafestival.com en it"
  "https://chromosphere.eu en"
  "https://vjtelevision.com en"
  "https://shockart.net en it"
  "https://linux-club.org it"
  "https://wam.flyer.it en it"
  "https://fotonicafestival.com en it"
  "https://flxer.net en it"
  "https://gianlucadelgobbo.net en it"
  "https://pacnetwork.org it"
  "https://electrokids.net it"
  "https://digitalatium.fotonicafestival.com en it"
  "https://visualsound.org it en"
  "https://visualsoundacademy.com it en"
  "https://flyer.it en it"
  "https://mediaartmuseum.org en it"
)

for entry in "${SITES[@]}"; do
  read -r domain langs <<< "$entry"
  echo "Warming $domain..."
  curl -sf "$domain/meta/?generate=1" -o /dev/null && echo "  meta OK" || echo "  meta FAIL"
  for lang in $langs; do
    default=$(echo "$entry" | awk '{print $2}')
    if [ "$lang" = "$default" ]; then
      url="$domain/?createcache=1"
    else
      url="$domain/$lang/?createcache=1"
    fi
    curl -sf "$url" -o /dev/null && echo "  cache $lang OK" || echo "  cache $lang FAIL"
  done
done

echo "Warmup done."
