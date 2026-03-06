#!/bin/bash
# Telegram Polling Script voor Wout de Scout

TOKEN="8790762091:AAHkzqE_7z22suw5Fd6BPnOWRAxtZ01LzQc"
OFFSET_FILE="/data/.openclaw/workspace/.telegram_offset"
LOG_FILE="/data/.openclaw/workspace/telegram-messages.log"

# Lees laatste offset
if [ -f "$OFFSET_FILE" ]; then
    OFFSET=$(cat "$OFFSET_FILE")
else
    OFFSET=0
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Telegram poller gestart (offset: $OFFSET)" >> "$LOG_FILE"

while true; do
    # Haal updates op
    RESPONSE=$(curl -s "https://api.telegram.org/bot${TOKEN}/getUpdates?offset=${OFFSET}&timeout=30")
    
    # Check of er berichten zijn
    RESULT_COUNT=$(echo "$RESPONSE" | jq '.result | length')
    
    if [ "$RESULT_COUNT" -gt 0 ]; then
        # Log nieuwe berichten
        echo "$RESPONSE" | jq -r '.result[] | "[" + (.message.date | tostring) + "] @" + .message.from.username + ": " + .message.text' >> "$LOG_FILE"
        
        # Update offset
        NEW_OFFSET=$(echo "$RESPONSE" | jq '.result[-1].update_id + 1')
        echo "$NEW_OFFSET" > "$OFFSET_FILE"
        OFFSET=$NEW_OFFSET
        
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $RESULT_COUNT nieuwe bericht(en) ontvangen" >> "$LOG_FILE"
    fi
    
    sleep 2
done
