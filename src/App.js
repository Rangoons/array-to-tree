import React, { Component } from 'react';
import './App.css';
import tree from './mock.js';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import tail from 'lodash/tail';
import reduce from 'lodash/reduce';

class App extends Component {
    arrayToTree = array => {
        const itemList = map(array, item => {
            return this.findParents(item.hierarchy);
        });
        console.log(this.reduceBranches(itemList));
    };

    findParents = array => {
        if (array.length === 1) {
            return { parent: null, category: array[0] };
        } else {
            const category = array.pop();
            const parent = array.pop();
            return { parent, category };
        }
    };
    reduceBranches = collection => {
        const f = reduce(
            collection,
            (result, value) => {
                if (!value.parent) {
                    result['top'] = { value: value.category };
                }
                if (value.parent === result.top.value) {
                    const subnodes = reduce(
                        collection,
                        (res, val) => {
                            if (value.category === val.parent) {
                                res.push(val.category);
                            }
                            return res;
                        },
                        []
                    );
                    result.top['sub'] = result.top['sub'] || [];
                    result.top['sub'].push({ value: value.category, subnodes });
                }
                return result;
            },
            {}
        );
        return f;
    };
    render() {
        return <div className="App">{this.arrayToTree(tree)}</div>;
    }
}

export default App;
