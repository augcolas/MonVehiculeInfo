# --------> install flask app
# python3 -m venv venv
# source venv/bin/activate
# --------> install requirements from file
# pip install -r requirements.txt

# --------> run flask API
# flask --app main run

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello</p>"