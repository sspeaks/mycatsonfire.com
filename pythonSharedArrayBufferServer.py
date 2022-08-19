from http.server import SimpleHTTPRequestHandler, HTTPServer

class handler(SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy','same-origin')
        SimpleHTTPRequestHandler.end_headers(self)


with HTTPServer(('', 8010), handler) as server:
    print("SERVING!")
    server.serve_forever()