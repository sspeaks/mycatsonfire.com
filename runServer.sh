#! /usr/bin/env nix-shell
#! nix-shell -i bash -p python3

# Start a Python HTTP server with proxying
python3 <<EOF
import http.server
import socketserver
import urllib.request

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Define paths to serve locally
        local_paths = ["/static", "/index.html"]

        # Check if the request path matches any local path
        if self.path == "/" or any(self.path.startswith(path) for path in local_paths):
            # Serve the request locally
            if self.path == "/":
                self.path = "/index.html"  # Redirect blank path to index.html
            super().do_GET()
        else:
            # Proxy the request to the remote server
            url = f"https://mycatsonfire.com{self.path}"
            print(f"Proxying request to: {url}")
            try:
                with urllib.request.urlopen(url) as response:
                    self.send_response(response.status)
                    for header, value in response.getheaders():
                        self.send_header(header, value)
                    self.end_headers()
                    self.wfile.write(response.read())
            except Exception as e:
                self.send_error(500, f"Error proxying request: {e}")

PORT = 8080
with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
    print(f"Serving proxy on port {PORT}")
    httpd.serve_forever()
EOF
