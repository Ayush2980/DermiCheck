from flask import Flask, render_template, request , jsonify
import json
import requests

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/data")
def do():
    result =  {'name' : 'Ayush Barman' , 'College' : 'IIT ISM Dhanbad'}
    app.logger.info("Hello")
    return jsonify({"status" : True ,  "message" : "Found", "data" : result})


if __name__ == "__main__":
    app.run(debug=True)