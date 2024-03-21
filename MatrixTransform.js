const MatrixTransformErrors = {
    INVALID_MATRIX_TYPE: 'the matrix must be an array',
    INVALID_EDGE_BORDER_SIZE: 'the edge border length greater than matrix size',
    UNDEFINED_EDGE_BORDER: 'the edge border must be defined',
};

const RotateMetricTypes = {
    PERCENTAGE: 'percentage',
    DEGREES: 'degrees',
};

const MatrixWrapMethods = {
    BOX: 'box',
    CIRCLE: 'circle',
};

/**
 * Cicle method not implemented
 */
class MatrixTransform {
    static clone(m) {
        const result = [], ml = m.length;
        // new deep immutable matrix
        for (let i = 0, l = m.length; i < l; i++) {
            result.push([...m[i]]);
        }
        return result;
    }

    /**
     * not immutable matrix
     * @param {Array<Array<Number>>} m Matrix
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static extractEdgeBorder(m, method = MatrixWrapMethods.BOX) {
        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return [];
            }
            case MatrixWrapMethods.BOX:
            default: {
                const nm = m, ml = m.length, result = [], lEdge = [], rEdge = [];
                result.push(...(nm.splice(0, 1)).flat());
                for (let i = 0, l1 = ml - 2; i < l1; i++) {
                    const row = nm[i];
                    lEdge.push(...row.splice(0, 1));
                    rEdge.push(...row.splice(row.length - 1, 1));
                }
                result.push(...rEdge);
                if (nm.length > 0) {
                    result.push(...nm.splice(nm.length - 1, 1).flat().reverse());
                }
                result.push(...lEdge.reverse());
                return result;
            }
        }
    }

    /**
     * @param {Array<Array<Number>>} m Matrix
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static unwrapEdgeBorders(m, method = MatrixWrapMethods.BOX) {
        // new deep immutable matrix
        const nm = MatrixTransform.clone(m), ml = m.length;

        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return [];
            }
            case MatrixWrapMethods.BOX:
            default: {
                const cm = Math.ceil(ml * .5), result = [];
                for (let i = 0; i < cm; i++) {
                    result.push(MatrixTransform.extractEdgeBorder(nm));
                }
                return result;
            }
        }
    };

    /**
     * @param {Array<Array<Number>>} m Matrix
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static getEdgeBorderLengthFromMatrix(m, method = MatrixWrapMethods.BOX) {

        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return 0;
            }
            case MatrixWrapMethods.BOX:
            default: {
                if (m.length === 0) {
                    return 0;
                }
                if (m.length === 1) {
                    return 1;
                }
                return m.length * 4 - 4;
            }
        }
    }

    /**
     * @param {Array<Number>>} eb 
     * @param {keyof MatrixWrapMethods}
     * @returns 
     */
    static getNestingSizeFromBorderLength(eb, method = MatrixWrapMethods.BOX) {
        if (!Array.isArray(eb)) {
            throw new Error(MatrixTransformErrors.UNDEFINED_EDGE_BORDER);
        }

        if (!eb.length) {
            return 0;
        }


        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return [];
            }
            case MatrixWrapMethods.BOX:
            default: {
                if (eb.length < 12) {
                    return 1;
                }

                return Math.ceil(Math.floor((eb.length + 4) * .25) * .5);
            }
        }
    }

    /**
     * @param {Array<Array<Number>>} m Matrix
     * @param {Array<Number>} eb Edge border
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static isValidEdgeBorder(m, eb, method = MatrixWrapMethods.BOX) {
        if (!Array.isArray(m)) {
            throw new Error(MatrixTransformErrors.INVALID_MATRIX_TYPE);
        }

        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return false;
            }
            case MatrixWrapMethods.BOX:
            default: {
                const isOdd = eb.length % 2 !== 0;
                const newEdgeBorderNestingSizeFromMatrix = m.length > 0 ? ((m.length + 2) * 4 - (m.length > 2 ? 4 : Number(!isOdd) + 1)) : Number(!isOdd) + 1;
                const newEdgeBorderNestingSize = MatrixTransform.getNestingSizeFromBorderLength(eb, method);
                if (newEdgeBorderNestingSize > newEdgeBorderNestingSizeFromMatrix) {
                    console.warn(MatrixTransformErrors.INVALID_EDGE_BORDER_SIZE);
                }

                return eb.length >= newEdgeBorderNestingSizeFromMatrix;
            }
        }
    }

    /**
     * @param {Array<Array<Number>>} m Matrix
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static unwrap(m, method = MatrixWrapMethods.BOX) {
        if (!Array.isArray(m)) {
            throw new Error(MatrixTransformErrors.INVALID_MATRIX_TYPE);
        }

        return MatrixTransform.unwrapEdgeBorders(m, method);
    }

    /**
     * @param {Array<Array<Number>>} m Matrix
     * @param {Array<Number>} eb Edge border
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static appendEdgeBorder(m, eb, method = MatrixWrapMethods.BOX) {
        if (!Array.isArray(m)) {
            throw new Error(MatrixTransformErrors.INVALID_MATRIX_TYPE);
        }

        // if (!MatrixTransform.isValidEdgeBorder(m, eb, method)) {
        //     throw new Error(MatrixTransformErrors.INVALID_EDGE_BORDER_SIZE);
        // }


        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return [];
            }
            case MatrixWrapMethods.BOX:
            default: {
                const meb = [...eb], result = m, isNew = result.length === 0;
                // Проверки на валидную длину нет
                if (isNew) {
                    const isOdd = meb.length % 4 !== 0;
                    if (isOdd) {
                        result.push(meb);
                        return result;
                    }

                    const newSize = 2, t = meb.splice(0, newSize), b = meb.splice(0, newSize).reverse();
                    result.push(t, b);
                    return result;
                }
                else {
                    const prevSize = m.length, newSize = prevSize + 2, t = meb.splice(0, newSize), r = meb.splice(0, prevSize),
                        b = meb.splice(0, newSize).reverse(), l = meb.splice(0, prevSize).reverse();
                    result.splice(0, 0, t);
                    result.push(b);
                    for (let i = 0, len = prevSize; i < len; i++) {
                        const j = i + 1;
                        result[j].splice(0, 0, l[i]);
                        result[j].push(r[i]);
                    }
                }
                return result;
            }
        }
    }

    /**
     * @param {Array<Array<Number>>} unwrapedMatrix 
     * @param {keyof MatrixWrapMethods} method
     * @returns 
     */
    static wrap(unwrapedMatrix, method = MatrixWrapMethods.BOX) {
        const result = [], um = unwrapedMatrix.reverse();
        for (let i = 0, l = um.length; i < l; i++) {
            MatrixTransform.appendEdgeBorder(result, um[i], method);
        }
        return result;
    }

    /**
     * @param {Array<Array<Number>>} matrix 
     */
    constructor(matrix) {
        this._matrix = MatrixTransform.clone(matrix);
    }

    /**
     * @param {Number} offset Default [0-1]
     * @param {keyof RotateMetricTypes} metrics RotateMetricTypes.PERCENTAGE is default. RotateMetricTypes.DEGREES in degrees
     * @param {{method: keyof MatrixWrapMethods, antialiasing: Number}} options
     * @returns 
     */
    rotate(offset, metrics, options = { method: MatrixWrapMethods.BOX, antialiasing: 0 }) {
        const m = metrics === RotateMetricTypes.DEGREES ? offset / 360 : offset, unwrap = MatrixTransform.unwrap(this._matrix, options.method);

        switch (method) {
            case MatrixWrapMethods.CIRCLE: {
                // etc
                return this._matrix;
            }
            case MatrixWrapMethods.BOX:
            default: {
                for (let i = 0, l = unwrap.length; i < l; i++) {
                    const seq = unwrap[i];
                    let dx = Math.round(m * seq.length);
                    const dir = Math.sign(dx);
                    while (dx) {
                        if (dir === 1) {
                            const el = seq[seq.length - 1];
                            seq.splice(seq.length - 1, 1);
                            seq.splice(0, 0, el);
                        } else {
                            const el = seq[0];
                            seq.splice(0, 1);
                            seq.push(el);
                        }
                        dx -= dir;
                    }
                }
                const rotatedMatrix = MatrixTransform.wrap(unwrap);
                this._matrix = rotatedMatrix;
                return this._matrix;
            }
        }
    }

    toString() {
        return !!this._matrix ? this._matrix.toString() : undefined;
    }

    toArray() {
        return MatrixTransform.clone(this._matrix);
    }
}

module.exports = {
    MatrixTransformErrors,
    MatrixTransform,
    RotateMetricTypes,
    MatrixWrapMethods,
};
