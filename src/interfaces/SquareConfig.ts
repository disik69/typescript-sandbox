interface SquareConfig {
    color: string;
    readonly height: number;
    width?: number;
}

let config: SquareConfig = {color: "red", height: 10};

// config.height = 8; // can't be modified
