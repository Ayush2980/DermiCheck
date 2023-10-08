from flask import Flask , template_rendered

app = Flask(__name__)

@app.route('/')
def print():
    template_rendered("index.html")

@app.route("/data")
def hello_world():
    return {'name' : 'Ayush Barman' , 'College' : 'IIT ISM Dhanbad'}

if __name__ == "__main__":
    app.run(debug=True , port = 8000)