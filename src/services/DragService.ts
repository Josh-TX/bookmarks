class DragService{
    constructor(){
        window.addEventListener("mousemove", (event) => this.dragged(event));
        window.addEventListener("mouseup", () => this.endDrag());
        window.addEventListener("mouseleave",() => this.endDrag());
        window.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });
    }
    private i: number | null = null;
    private startX = 0;
    private startY = 0;
    private cardOffsetX = 0;
    private cardOffsetY = 0;
    private listenCallbacks: Array<(i: number, to: number) => any> = [];
    private lastSpot: number | null = null;
    setupCard(i: number){
        var el = document.getElementById("card-" + i)!;
        el.addEventListener("mousedown", (e) => this.startDrag(i, e));
        // el.addEventListener('dragstart', function (e) {
        //     e.preventDefault();
        // });
    }
    listenDragOver(callback: (i: number, to: number) => any){
        this.listenCallbacks.push(callback);
    }
    stopListening(callback: (i: number, to: number) => any){
        this.listenCallbacks = this.listenCallbacks.filter(z => z != callback);
    }

    private startDrag(i: number, event: MouseEvent){
        this.startX = event.pageX;
        this.startY = event.pageY;
        var rect = (<HTMLElement>event.target).getBoundingClientRect();
        this.cardOffsetX = event.offsetX - rect.width / 2
        this.cardOffsetY = event.offsetY - rect.height / 2
        this.i = i;
        this.lastSpot = i;
        var el = document.getElementById("card-" + i)!;
        el.classList.add("dragging")
    }
    private dragged(event: MouseEvent){
        if (this.i == null){
            return;
        }
        var el = document.getElementById("card-" + this.i);
        if (!el){
            return;
        }
        var elements = document.elementsFromPoint(event.clientX, event.clientY);
        var spotContainer = elements.find(z => z.classList.contains("spot-container"));
        if (spotContainer){
            var id = (<HTMLElement>spotContainer.firstChild).id;
            var hoverIndex = parseFloat(id.substring(5));//exclude "spot-"
            if (hoverIndex != this.lastSpot){
                console.log("this.lastSpot = " + this.lastSpot, "hoverIndex = " + hoverIndex)
                this.listenCallbacks.forEach(c => c(this.i!, hoverIndex));
            }
            this.lastSpot = hoverIndex;
        }
        var yDiff = this.startY - event.pageY - this.cardOffsetY;
        var xDiff = this.startX - event.pageX - this.cardOffsetX;
        el.style.left = `${-xDiff}px`
        el.style.right = `${xDiff}px`
        el.style.top = `${-yDiff}px`
        el.style.bottom = `${yDiff}px`
    }
    private endDrag(){
        if (this.i == null){
            return;
        }
        var el = document.getElementById("card-" + this.i);
        if (el){
            el.classList.remove("dragging")
            el.style.left = "0"
            el.style.right = "0"
            el.style.top = "0"
            el.style.bottom = "0"
        }
        this.i = null;
    }
}

export var dragService = new DragService();
