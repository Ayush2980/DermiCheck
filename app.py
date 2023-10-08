from flask import Flask , template_rendered, jsonify

app = Flask(__name__)

@app.route('/')
def print():
    template_rendered("index.html")

@app.route("/data")
def hello_world():
    result =  {'name' : 'Ayush Barman' , 'College' : 'IIT ISM Dhanbad'}
    return jsonify({"status" : True ,  "message" : "Found", "data" : result})

if __name__ == "__main__":
    app.run(debug=True , host='0.0.0.0' , port = 8000)