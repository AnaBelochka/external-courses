function App() {
    this.model = new Model();
    this.controller = new Controller(this.model);
    this.view = new View(this.controller);
}

var app = new App();
app.view.init();