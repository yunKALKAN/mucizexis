from flask import Flask
app = Flask(name)
@app.route('/')
def home():
return 'Merhaba Dünya'
if name == 'main':
app.run(host='0.0.0.0', port=8080)
