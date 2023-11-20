from flask import Flask,render_template
import werkzeug.serving
from flask import request,send_file,make_response
from flask import jsonify
from PIL import Image
import io
import base64
import codecs
app = Flask(__name__)

@app.route('/compute',methods=['POST'])
def archive():
    if request.method == 'POST': #이미지
        with open('32.jpg','rb') as f :
            img = f.read()
        print(send_file(io.BytesIO(img),mimetype='image/jpeg'))
    return send_file(io.BytesIO(img),mimetype='image/jpeg')

@app.route('/check',methods=['POST'])
def check():
    if request.method == 'POST' :
        string = 'HI'
    return string

app.run( '0.0.0.0' ,port = 10011, threaded=True,debug=True)