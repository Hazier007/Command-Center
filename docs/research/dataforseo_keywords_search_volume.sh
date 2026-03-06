#!/usr/bin/env bash
set -euo pipefail

# DataForSEO Keywords Data (Google Ads) — search volume (LIVE)
# Usage:
#   ./dataforseo_keywords_search_volume.sh \
#     --location 2056 --language nl \
#     --keywords "opblaasbare sup" "beste opblaasbare kayak"
#
# Env vars expected:
#   DATAFORSEO_LOGIN
#   DATAFORSEO_PASSWORD
#
# Note: if DATAFORSEO_PASSWORD looks like base64 of "login:password", we auto-decode.

LOCATION=2056
LANGUAGE=nl
KEYWORDS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --location) LOCATION="$2"; shift 2;;
    --language) LANGUAGE="$2"; shift 2;;
    --keywords) shift; while [[ $# -gt 0 && "$1" != --* ]]; do KEYWORDS+=("$1"); shift; done;;
    *) KEYWORDS+=("$1"); shift;;
  esac
done

if [[ -z "${DATAFORSEO_LOGIN:-}" || -z "${DATAFORSEO_PASSWORD:-}" ]]; then
  echo "Missing env vars: DATAFORSEO_LOGIN/DATAFORSEO_PASSWORD" >&2
  exit 1
fi

pass="$DATAFORSEO_PASSWORD"
# auto-decode base64 token if it decodes to something like "user:pass"
if decoded=$(printf %s "$pass" | base64 -d 2>/dev/null) && [[ "$decoded" == *:* ]]; then
  pass="${decoded#*:}"
fi

if [[ ${#KEYWORDS[@]} -eq 0 ]]; then
  echo "No keywords provided." >&2
  exit 1
fi

json_keywords=$(printf '%s\n' "${KEYWORDS[@]}" | awk 'BEGIN{print "["} {gsub(/\\/ , "\\\\"); gsub(/\"/, "\\\""); printf "%s\"%s\"", (NR>1?",":""), $0} END{print "]"}')

payload=$(cat <<JSON
[{"keywords": $json_keywords, "location_code": $LOCATION, "language_code": "$LANGUAGE"}]
JSON
)

curl -sS -u "$DATAFORSEO_LOGIN:$pass" \
  "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live" \
  -H "Content-Type: application/json" \
  -d "$payload"
