var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');
var program = gl.createProgram();

var VSHADER_SOURCE, FSHADER_SOURCE;

VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'void main () {\n' +
    'gl_Position = a_Position;\n' +
  '}\n'
;

FSHADER_SOURCE = 
  'void main () {\n' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n'
;

// define shader
var vertexShader, fragmentShader;

function createShader(gl, sourceCode, type) {
  // create shader
  var shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);
  return shader;
}

vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);
fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER);

// attach shader to program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// link program to context
gl.linkProgram(program);

// add this for extra debugging
if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
  var info = gl.getProgramInfoLog(program);
  throw new Error('Could not compile WebGL program. nn' + info);
}

gl.useProgram(program);
gl.program = program;

function initVertexBuffers(gl) {
  // 绘制三角形核心代码，以下数字分别代表3个顶点
  var vertices = new Float32Array([
    -1, 1, -1, -1, 1, -1
  ]);
  var n = 3;
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // get attribute a_Position address in vertex shader
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // enable a_Position variable
  gl.enableVertexAttribArray(a_Position);
  return n;
}

// write the positions of vertices to a vertex shader
var n = initVertexBuffers(gl);

gl.clearColor(0, 0, 0, 0.1);

function draw() {
  // clear canvas and add background color
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

draw();
