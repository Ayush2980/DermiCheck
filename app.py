from flask import Flask

app = Flask(__name__)

@app.route("/Hello")
def hello_world():
    return {'name' : 'Ayush Barman' , 'College' : 'IIT ISM Dhanbad'}

if __name__ == "__main__":
    app.run(debug=True , port = 8000)