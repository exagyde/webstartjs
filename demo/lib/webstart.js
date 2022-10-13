/**
 * Name: WebstartJS
 * Author: Nolann Morencé
 * Version: 1.1.0
 */

let Data = null;window.addEventListener("load", () => {fetch("./start.json").then(res => res.json()).then(json => {Data = json;document.title = json.title;Default.loadPage(json.start_page);});});let scriptIteration = 0;async function LoadComponent(url) {scriptIteration++;await import("./../app/"+url+".js?n="+scriptIteration);}class Header {constructor({title, menu, styles}) {this.title = title ?? "";this.menu = menu ?? [];this.styles = styles ?? {};}render() {let h1 = document.createElement("h1");h1.textContent = this.title;let nav = document.createElement("nav");this.menu.forEach(item => {let a = document.createElement("a");a.href = item.src ?? "#";a.textContent = item.name ?? "page";a.onclick = (event) => {if(a.href.includes("page:")) {event.preventDefault();Default.loadPage(a.href.split(":")[1]);}};nav.append(a);});if(this.menu.length > 0) {header.append(h1, nav);} else {header.append(h1);}header.classList.replace("hide", "row");Default.setStyle(header, this.styles);}}class Footer {constructor({content, styles}) {this.content = content ?? "";this.styles = styles ?? {};}add(...elements) {elements.forEach(element => {if(!this.has(element)) {footer.append(element.getNode());}});}has(element) {return ![...footer.children].every(child => child.outerHTML !== element.getNode().outerHTML);}render() {footer.append(this.content);footer.classList.replace("hide", "row");Default.setStyle(footer, this.styles);}}let Main = {add: (...elements) => {elements.forEach(element => {if(!Main.has(element)) {element.render();}});},remove: (element) => {[...main.children].find(child => child.outerHTML === element.getNode().outerHTML).remove();},replace: (oldElement, newElement) => {main.insertBefore(newElement.getNode(), [...main.children].find(child => child.outerHTML === oldElement.getNode().outerHTML));Main.remove(oldElement);},has: (element) => {return ![...main.children].every(child => child.outerHTML !== element.getNode().outerHTML);}};class Bloc {constructor({elements, direction, styles}) {this.elements = elements ?? [];this.direction = direction ?? "horizontal";this.styles = styles ?? {};}getNode() {let div = document.createElement("div");this.elements.forEach(element => {div.append(element.getNode());});if(this.direction == "vertical") {div.classList.add("column");} else {div.classList.add("row");}Default.setStyle(div, this.styles);return div;}render() { main.append(this.getNode()); }}class Title {constructor({content, size, styles}) {this.content = content ?? "title";this.size = size ?? 1;this.styles = styles ?? {};}getNode() {let title = document.createElement("h"+this.size);title.textContent = this.content;Default.setStyle(title, this.styles);return title;}render() { main.append(this.getNode()); }}const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.";class Text {constructor({content, styles}) {this.content = content ?? LoremIpsum;this.styles = styles ?? {};}getNode() {let text = document.createElement("p");text.textContent = this.content;Default.setStyle(text, this.styles);return text;}render() {  main.append(this.getNode()); }}class Link {constructor({url, name, styles}) {this.url = url ?? "#";this.name = name ?? "lien";this.styles = styles ?? {};}getNode() {let a = document.createElement("a");a.href = this.url;a.target = "_blank";a.textContent = this.name;a.onclick = (event) => {if(a.href.includes("page:")) {event.preventDefault();Default.loadPage(a.href.split(":")[1]);}};Default.setStyle(a, this.styles);return a;}render() { main.append(this.getNode()); }}class Image {constructor({url, legend, styles}) {this.url = url ?? "#";this.legend = legend ?? "";this.styles = styles ?? {};}getNode() {let figure = document.createElement("figure");let img = document.createElement("img");let figcaption = document.createElement("figcaption");img.src = "./../app/"+this.url;if(this.legend.length > 0) {img.alt = this.legend;img.title = this.legend;} else {img.alt = this.url.split("/").slice(-1);img.title = this.url.split("/").slice(-1);}figcaption.textContent = this.legend;figure.append(img, figcaption);Default.setStyle(figure, this.styles);return figure;}render() { main.append(this.getNode()); }}export {Data,LoadComponent,Header, Main, Footer,Bloc,Title, Text, Link, Image};let Default = {variables: {pageIteration: 0},clear: () => {let header = document.getElementById("header");let main = document.getElementById("main");let footer = document.getElementById("footer");let scripts = document.body.querySelectorAll("script");while(header.hasChildNodes()) { header.removeChild(header.firstChild); }while(main.hasChildNodes()) { main.removeChild(main.firstChild); }while(footer.hasChildNodes()) { footer.removeChild(footer.firstChild); }scripts.forEach(script => document.body.removeChild(script));header.classList.replace("row", "hide");main.classList.replace("row", "hide");footer.classList.replace("row", "hide");},loadPage: (page) => {Default.variables.pageIteration++;if(document.head.lastChild.id == "page") {document.head.removeChild(document.head.lastChild);}Default.clear();let script = document.createElement("script");script.id = "page";script.src = "./app/"+page+".js?n"+Default.variables.pageIteration;script.type = "module";document.head.append(script);},setStyle: (element, styles) => {Object.entries(styles).forEach(([key, value]) => {element.style.setProperty("--"+key, value);});}};