json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.name @message.user.name