
// import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { TemplecategoryserviceService } from '../../services/templecategoryservice/templecategoryservice.service';
// import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
// import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
// import { FormsModule } from '@angular/forms';
// import { NzTreeModule } from 'ng-zorro-antd/tree';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { GoshalaService } from '../../services/goshalaservice/goshala.service';
// import { EventService } from '../../services/eventservice/event.service';
// import { LocationService } from '../../services/location/location.service';
// import { CommonModule } from '@angular/common';



// @Component({
//   selector: 'app-tree-view',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NzTreeModule, NzInputModule],
//   templateUrl: './tree-view.component.html',
//   styleUrls: ['./tree-view.component.css'],
//   changeDetection: ChangeDetectionStrategy.Default,
// })
// export class TreeViewComponent implements OnInit {


//   categoryList: any[] = [];
//   treeClicked: boolean = false;
//   nodes: NzTreeNodeOptions[] = [];
//   searchValue: string = '';
//   sidebarVisible: boolean = false;
//   indiaId: any;
//   @Input() treeType: string = '';
//   @Input() disabled: boolean = false;
//   @Output() nodeClick = new EventEmitter<any>();

//   onNodeClick(event: any) {
//     if (!this.disabled) {
//       this.nodeClick.emit(event);
//     }
//   }




  

//   constructor(
//     private templeCategoryService: TemplecategoryserviceService,
//     private goshalaService: GoshalaService,
//     private eventService: EventService,
//     private locationService: LocationService
//   ) {}





//   ngOnInit(): void {
//     if (this.treeType === 'templecategory') {
//       this.templeCategoryService.GetallCategories().subscribe(
//         res => {
//           this.categoryList = res;
//           this.nodes = this.createNodeTree(this.categoryList);
//           this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//         },
//         err => {
//           console.log(err);
//         }
//       );
//     }

//     if (this.treeType === 'goshalacategory') {
//       this.goshalaService.getGoshalaCatgeories().subscribe(
//         res => {
//           this.categoryList = res;
//           this.nodes = this.createNodeTree(this.categoryList);
//           this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//         },
//         err => {
//           console.log(err);
//         }
//       );
//     }

//     if (this.treeType === 'eventcategory') {
//       this.eventService.getEventCategory().subscribe(
//         res => {
//           this.categoryList = res;
//           this.nodes = this.createNodeTree(this.categoryList);
//           this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//         },
//         err => {
//           console.log(err);
//         }
//       );
//     }

//     if (this.treeType === 'india') {
//       this.locationService.getNameByCountry('India').subscribe(
//         (data: any) => {
//           if (Array.isArray(data) && data.length > 0) {
//             this.indiaId = data[0]._id;
//             this.locationService.getbyStates(this.indiaId).subscribe(
//               res => {
//                 this.nodes = this.createNodeTree(res);
//                 this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//               },
//               err => {
//                 console.log(err);
//               }
//             );
//           } else {
//             console.error('No category data found');
//           }
//         },
//         error => {
//           console.error('Error fetching category data', error);
//         }
//       );
//     }

//     if (this.treeType === 'global') {
//       this.locationService.GetAllCountries().subscribe(
//         res => {
//           this.categoryList = res;
//           this.nodes = this.createNodeTree(this.categoryList);
//           this.nodes.sort((a, b) => a.title.localeCompare(b.title));
//         },
//         err => {
//           console.log(err);
//         }
//       );
//     }
//   }

//   nzEvent(event: NzFormatEmitEvent): void {
//     if (event.eventName === 'expand') {
//       const node = event.node;
//       if (this.treeType === 'templecategory' && node && node.children.length === 0 && !node.isLeaf) {
//         // Add your logic for expanding nodes here, if necessary
//       }

//       if (this.treeType === 'goshalacategory' && node && node.children.length === 0 && !node.isLeaf) {
//         // Add your logic for expanding nodes here, if necessary
//       }

//       if (this.treeType === 'eventcategory' && node && node.children.length === 0 && !node.isLeaf) {
//         // Add your logic for expanding nodes here, if necessary
//       }

//       if (this.treeType === 'india' && node && node.children.length === 0 && !node.isLeaf) {
//         switch (node.level) {
//           case 0:
//             this.loadDistrictNodesForStates(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//           case 1:
//             this.loadBlocks(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//           case 2:
//             this.loadVillages(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//           default:
//             break;
//         }
//       }


//       if (this.treeType === 'global' && node && node.children.length === 0 && !node.isLeaf) {
//         switch (node.level) {
//           case 0:
//             this.loadStateNodes(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//           case 1:
//             this.loadDistrictNodes(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//           case 2:
//             this.loadglobalBlocks(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//             case 3:
//             this.loadglobalVillages(node);
//             if (node) {
//               node.setExpanded(true);
//             }
//             break;
//           default:
//             break;
//         }
//       }
//     }

//     if (event.eventName === 'click') {
//       this.nodeClick.emit(event);
//       this.treeClicked = true;
//     }
//   }

//   createNodeTree(list: any[]): NzTreeNodeOptions[] {
//     return list.map(listItem => ({
//       key: listItem._id,
//       title: listItem.name,
//       isLeaf: false,
//       children: [],
//     }));
//   }

//   isIndiaTreeType(): boolean {
//     return this.treeType === 'india';
//   }

//   loadDistrictNodesForStates(stateNode: NzTreeNodeOptions): void {
//     this.locationService.getdistricts(stateNode.key).subscribe(districts => {
//       const updatedNodes = this.nodes.map(node => {
//         if (node.key === stateNode.key) {
//           return {
//             ...node,
//             children: districts.map((district: any) => ({
//               key: district._id,
//               title: district.name,
//               isLeaf: false,
//               level: 'district',
//               expandable: true,
//               children: [],
//             })),
//           };
//         }
//         return node;
//       });

//       this.nodes = [...updatedNodes];
//     });
//   }

//   loadBlocks(districtNode: NzTreeNodeOptions): void {
//     this.locationService.getblocks(districtNode.key).subscribe(
//       (blocks: any[]) => {
//         const updatedNodes = this.nodes.map(node => {
//           if (!node.children) {
//             return node;
//           }
//           return {
//             ...node,
//             children: node.children.map(childNode => {
//               if (childNode.key === districtNode.key) {
//                 return {
//                   ...childNode,
//                   children: blocks.map(block => ({
//                     key: block._id,
//                     title: block.name,
//                     isLeaf: false,
//                     expandable: true,
//                     children: [],
//                   })),
//                 };
//               }
//               return childNode;
//             }),
//           };
//         });
//         this.nodes = [...updatedNodes];
//       },
//       error => {
//         console.error('Error fetching blocks:', error);
//       }
//     );
//   }

//   loadVillages(blockNode: NzTreeNodeOptions): void {
//     this.locationService.getvillages(blockNode.key).subscribe(
//       (villages: any[]) => {
//         const updatedNodes = this.nodes.map(stateNode => {
//           if (stateNode.children) {
//             return {
//               ...stateNode,
//               children: stateNode.children.map(districtNode => {
//                 if (districtNode.children) {
//                   return {
//                     ...districtNode,
//                     children: districtNode.children.map(innerBlockNode => {
//                       if (innerBlockNode.key === blockNode.key) {
//                         return {
//                           ...innerBlockNode,
//                           children: villages.map(village => ({
//                             key: village._id,
//                             title: village.name,
//                             isLeaf: true,
//                             expandable: false,
//                             children: [],
//                           })),
//                         };
//                       }
//                       return innerBlockNode;
//                     }),
//                   };
//                 }
//                 return districtNode;
//               }),
//             };
//           }
//           return stateNode;
//         });
//         this.nodes = [...updatedNodes];
//       },
//       error => {
//         console.error('Error fetching villages:', error);
//       }
//     );
//   }


//   loadStateNodes(countryNode: NzTreeNodeOptions): void {
//     this.locationService.getbyStates(countryNode.key).subscribe(states => {
//         const updatedNodes = this.nodes.map(node => {
//             if (node.key === countryNode.key) {
//                 return {
//                     ...node,
//                     children: states.map((state: any) => ({
//                         key: state._id,
//                         title: state.name,
//                         isLeaf: false,
//                         level: 'state',
//                         expandable: true,
//                         children: [],
//                     })),
//                 };
//             }
//             return node;
//         });
//         this.nodes = [...updatedNodes];
//     });
// }

// loadDistrictNodes(stateNode: NzTreeNodeOptions): void {
//     this.locationService.getdistricts(stateNode.key).subscribe(districts => {
//         const updatedNodes = this.nodes.map(node => {
//             if (node.children) {
//                 return {
//                     ...node,
//                     children: node.children.map(state => {
//                         if (state.key === stateNode.key) {
//                             return {
//                                 ...state,
//                                 children: districts.map((district: any) => ({
//                                     key: district._id,
//                                     title: district.name,
//                                     isLeaf: false,
//                                     level: 'district',
//                                     expandable: true,
//                                     children: [],
//                                 })),
//                             };
//                         }
//                         return state;
//                     }),
//                 };
//             }
//             return node;
//         });
//         this.nodes = [...updatedNodes];
//     });
// }

// loadglobalBlocks(districtNode: NzTreeNodeOptions): void {
//     this.locationService.getblocks(districtNode.key).subscribe(blocks => {
//         const updatedNodes = this.nodes.map(node => {
//             if (node.children) {
//                 return {
//                     ...node,
//                     children: node.children.map(state => {
//                         if (state.children) {
//                             return {
//                                 ...state,
//                                 children: state.children.map(district => {
//                                     if (district.key === districtNode.key) {
//                                         return {
//                                             ...district,
//                                             children: blocks.map((block: any) => ({
//                                                 key: block._id,
//                                                 title: block.name,
//                                                 isLeaf: false,
//                                                 expandable: true,
//                                                 children: [],
//                                             })),
//                                         };
//                                     }
//                                     return district;
//                                 }),
//                             };
//                         }
//                         return state;
//                     }),
//                 };
//             }
//             return node;
//         });
//         this.nodes = [...updatedNodes];
//     },
//     error => {
//         console.error('Error fetching blocks:', error);
//     });
// }

// loadglobalVillages(blockNode: NzTreeNodeOptions): void {
//     this.locationService.getvillages(blockNode.key).subscribe(villages => {
//         const updatedNodes = this.nodes.map(node => {
//             if (node.children) {
//                 return {
//                     ...node,
//                     children: node.children.map(state => {
//                         if (state.children) {
//                             return {
//                                 ...state,
//                                 children: state.children.map(district => {
//                                     if (district.children) {
//                                         return {
//                                             ...district,
//                                             children: district.children.map(block => {
//                                                 if (block.key === blockNode.key) {
//                                                     return {
//                                                         ...block,
//                                                         children: villages.map((village: any) => ({
//                                                             key: village._id,
//                                                             title: village.name,
//                                                             isLeaf: true,
//                                                             expandable: false,
//                                                             children: [],
//                                                         })),
//                                                     };
//                                                 }
//                                                 return block;
//                                             }),
//                                         };
//                                     }
//                                     return district;
//                                 }),
//                             };
//                         }
//                         return state;
//                     }),
//                 };
//             }
//             return node;
//         });
//         this.nodes = [...updatedNodes];
//     },
//     error => {
//         console.error('Error fetching villages:', error);
//     });
// }

// }


import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TemplecategoryserviceService } from '../../services/templecategoryservice/templecategoryservice.service';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { FormsModule } from '@angular/forms';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GoshalaService } from '../../services/goshalaservice/goshala.service';
import { EventService } from '../../services/eventservice/event.service';
import { LocationService } from '../../services/location/location.service';
import { CommonModule } from '@angular/common';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTreeModule, NzInputModule],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeViewComponent implements OnInit {
  categoryList: any[] = [];
  treeClicked: boolean = false;
  nodes: NzTreeNodeOptions[] = [];
  locationNodes: NzTreeNodeOptions[] = [];
  searchValue: string = '';
  sidebarVisible: boolean = false;
  indiaId: any;
  @Input() treeType: string = '';
  @Input() disabled: boolean = false;
  @Output() nodeClick = new EventEmitter<any>();

  treeType1 = 'india';
  showTree = false;  // Flag to toggle the visibility

  // Method to toggle the visibility of the nz-tree component
  toggleTree() {
    this.showTree = !this.showTree;
  }

  onNodeClick(node: NzTreeNodeOptions): void {
    this.nodeClick.emit({ treeType: this.treeType, node });
  }

 


  // Convert NzTreeNodeOptions[] to NzTreeNode[]
convertToNzTreeNode(nodes: NzTreeNodeOptions[]): NzTreeNode[] {
  return nodes.map(node => new NzTreeNode(node));
}


  constructor(
    private templeCategoryService: TemplecategoryserviceService,
    private goshalaService: GoshalaService,
    private eventService: EventService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    // if (this.treeType === 'templecategory') {
    //   this.templeCategoryService.GetallCategories().subscribe(
    //     (res: any[]) => {
    //       this.categoryList = res;
    //       this.nodes = this.createNodeTree(this.categoryList);
          
    //       this.nodes.sort((a, b) => a.title.localeCompare(b.title));
    //     },
    //     (err: any) => console.error('Error loading category data:', err)
    //   );
    // }

    if (this.treeType === 'templecategory') {
      this.templeCategoryService.GetallCategories().subscribe(
        (res: any[]) => {
          this.categoryList = res;
          this.nodes = this.createNodeTree(this.categoryList);
    
          // Append the "All Temples" node with a key
          this.nodes.push({ key: '', title: 'All Temples', value: '' });
    
          // Sort the nodes alphabetically
          this.nodes.sort((a, b) => a.title.localeCompare(b.title));
        },
        (err: any) => console.error('Error loading category data:', err)
      );
    }
    
    

    if (this.treeType === 'goshalacategory') {
      this.goshalaService.getGoshalaCatgeories().subscribe(
        (res: any[]) => {
          this.categoryList = res;
          this.nodes = this.createNodeTree(this.categoryList);
          this.nodes.push({ key: '', title: 'All Goshalas', value: '' });
          this.nodes.sort((a, b) => a.title.localeCompare(b.title));
        },
        (err: any) => console.error('Error loading category data:', err)
      );
    }

    if (this.treeType === 'eventcategory') {
      this.eventService.getEventCategory().subscribe(
        (res: any[]) => {
          this.categoryList = res;
          this.nodes = this.createNodeTree(this.categoryList);
          this.nodes.push({ key: '', title: 'All Events', value: '' });
          this.nodes.sort((a, b) => a.title.localeCompare(b.title));
        },
        (err: any) => console.error('Error loading category data:', err)
      );
    }

    if (this.treeType === 'india') {
      this.locationService.getNameByCountry('India').subscribe(
        (data: any[]) => {
          if (Array.isArray(data) && data.length > 0) {
            this.indiaId = data[0]._id;
            this.locationService.getbyStates(this.indiaId).subscribe(
              (res: any[]) => {
                this.locationNodes = this.createNodeTree(res);
                this.locationNodes.sort((a, b) => a.title.localeCompare(b.title));
              },
              (err: any) => console.error('Error fetching states data:', err)
            );
          } else {
            console.error('No category data found');
          }
        },
        (error: any) => console.error('Error fetching country data:', error)
      );
    }

    if (this.treeType === 'global') {
      this.locationService.GetAllCountries().subscribe(
        (res: any[]) => {
          this.categoryList = res;
          this.nodes = this.createNodeTree(this.categoryList);
          this.nodes.sort((a, b) => a.title.localeCompare(b.title));
        },
        (err: any) => console.error('Error loading global data:', err)
      );
    }
  }

  


 // In your component.ts file
// nzEvent(event: NzFormatEmitEvent): void {
//   const node = event.node!;
  
//   if (event.eventName === 'click') {
//     if (!node.isExpanded) {
//       if (node.children?.length === 0 && !node.isLeaf) {
//         switch (node.level) {
//           case 0:
//             if (this.treeType === 'india') {
//               this.loadDistrictNodesForStates(node);
//             } else if (this.treeType === 'global') {
//               this.loadStateNodes(node);
//             }
//             break;
//           case 1:
//             if (this.treeType === 'india') {
//               this.loadBlocks(node);
//             } else if (this.treeType === 'global') {
//               this.loadDistrictNodes(node);
//             }
//             break;
//           case 2:
//             if (this.treeType === 'india') {
//               this.loadVillages(node);
//             } else if (this.treeType === 'global') {
//               this.loadglobalBlocks(node);
//             }
//             break;
//           case 3:
//             if (this.treeType === 'global') {
//               this.loadglobalVillages(node);
//             }
//             break;
//           default:
//             break;
//         }
//       }
//       node.isExpanded = true;
//     }
//     this.nodeClick.emit(event);
//     this.treeClicked = true;
//   }
// }



// 222222222222222222222


// nzEvent(event: NzFormatEmitEvent): void {
//   const node = event.node!;
  
//   if (event.eventName === 'click') {
//     // Collapse all other nodes
//     this.collapseAllNodes(this.locationNodes.map(opt => new NzTreeNode(opt)), node.key);

//     if (!node.isExpanded) {
//       if (node.children?.length === 0 && !node.isLeaf) {
//         switch (node.level) {
//           case 0:
//             if (this.treeType === 'india') {
//               this.loadDistrictNodesForStates(node);
//             } else if (this.treeType === 'global') {
//               this.loadStateNodes(node);
//             }
//             break;
//           case 1:
//             if (this.treeType === 'india') {
//               this.loadBlocks(node);
//             } else if (this.treeType === 'global') {
//               this.loadDistrictNodes(node);
//             }
//             break;
//           case 2:
//             if (this.treeType === 'india') {
//               this.loadVillages(node);
//             } else if (this.treeType === 'global') {
//               this.loadglobalBlocks(node);
//             }
//             break;
//           case 3:
//             if (this.treeType === 'global') {
//               this.loadglobalVillages(node);
//             }
//             break;
//           default:
//             break;
//         }
//       }
//       node.isExpanded = true;
//     }
//     this.nodeClick.emit(event);
//     this.treeClicked = true;
//   }
// }

// // Helper method to collapse all nodes except the currently clicked one
// collapseAllNodes(nodes: NzTreeNode[], excludeKey: string): void {
//   nodes.forEach(node => {
//     if (node.key !== excludeKey) {
//       node.isExpanded = false;
//     }
//     if (node.children) {
//       this.collapseAllNodes(node.children, excludeKey);
//     }
//   });
// }

// In your component.ts file
nzEvent(event: NzFormatEmitEvent): void {
  const node = event.node!;

  if (event.eventName === 'click') {
    // Convert locationNodes to NzTreeNode[]
    const nzTreeNodes = this.convertToNzTreeNode(this.locationNodes);

    // Collapse all other nodes
    // this.collapseAllNodes(nzTreeNodes, node.key);

    if (!node.isExpanded) {
      if (node.children?.length === 0 && !node.isLeaf) {
        switch (node.level) {
          case 0:
            if (this.treeType === 'india') {
              this.loadDistrictNodesForStates(node);
            } else if (this.treeType === 'global') {
              this.loadStateNodes(node);
            }
            break;
          case 1:
            if (this.treeType === 'india') {
              this.loadBlocks(node);
            } else if (this.treeType === 'global') {
              this.loadDistrictNodes(node);
            }
            break;
          case 2:
            if (this.treeType === 'india') {
              this.loadVillages(node);
            } else if (this.treeType === 'global') {
              this.loadglobalBlocks(node);
            }
            break;
          case 3:
            if (this.treeType === 'global') {
              this.loadglobalVillages(node);
            }
            break;
          default:
            break;
        }
      }
      node.isExpanded = true;
    }

    // Deselect all nodes
    this.deselectAllNodes(nzTreeNodes);
    // Select the clicked node
    node.isSelected = true;

    this.nodeClick.emit(event);
    this.treeClicked = true;
  }
}

// Helper method to collapse all nodes except the currently clicked one
// collapseAllNodes(nodes: NzTreeNode[], excludeKey: string): void {
//   nodes.forEach(node => {
//     if (node.key !== excludeKey) {
//       node.isExpanded = false;
//     }
//     if (node.children) {
//       this.collapseAllNodes(node.children, excludeKey);
//     }
//   });
// }

// Helper method to deselect all nodes
deselectAllNodes(nodes: NzTreeNode[]): void {
  nodes.forEach(node => {
    node.isSelected = false;
    if (node.children) {
      this.deselectAllNodes(node.children);
    }
  });
}







  createNodeTree(list: any[]): NzTreeNodeOptions[] {
    return list.map(listItem => ({
      key: listItem._id,
      title: listItem.name,
      isLeaf: false,
      children: [],
    }));
  }

  isIndiaTreeType(): boolean {
    return this.treeType === 'india';
  }
  onTreeTypeChange(newType: string): void {
    this.treeType = newType;
    this.treeType = newType;
    // Additional logic if needed
  }

  loadDistrictNodesForStates(stateNode: NzTreeNodeOptions): void {
    this.locationService.getdistricts(stateNode.key).subscribe(
      (districts: any[]) => {
        const updatedNodes = this.locationNodes.map(node => {
          if (node.key === stateNode.key) {
            return {
              ...node,
              children: districts.map((district: any) => ({
                key: district._id,
                title: district.name,
                isLeaf: false,
                level: 'district',
                expandable: true,
                children: [],
              })),
            };
          }
          return node;
        });
        this.locationNodes = [...updatedNodes];
      },
      (error: any) => console.error('Error fetching districts:', error)
    );
  }

  loadBlocks(districtNode: NzTreeNodeOptions): void {
    this.locationService.getblocks(districtNode.key).subscribe(
      (blocks: any[]) => {
        const updatedNodes = this.locationNodes.map(node => {
          if (node.children) {
            return {
              ...node,
              children: node.children.map(childNode => {
                if (childNode.key === districtNode.key) {
                  return {
                    ...childNode,
                    children: blocks.map(block => ({
                      key: block._id,
                      title: block.name,
                      isLeaf: false,
                      expandable: true,
                      children: [],
                    })),
                  };
                }
                return childNode;
              }),
            };
          }
          return node;
        });
        this.locationNodes = [...updatedNodes];
      },
      (error: any) => console.error('Error fetching blocks:', error)
    );
  }

  loadVillages(blockNode: NzTreeNodeOptions): void {
    this.locationService.getvillages(blockNode.key).subscribe(
      (villages: any[]) => {
        const updatedNodes = this.locationNodes.map(stateNode => {
          if (stateNode.children) {
            return {
              ...stateNode,
              children: stateNode.children.map(districtNode => {
                if (districtNode.children) {
                  return {
                    ...districtNode,
                    children: districtNode.children.map(innerBlockNode => {
                      if (innerBlockNode.key === blockNode.key) {
                        return {
                          ...innerBlockNode,
                          children: villages.map(village => ({
                            key: village._id,
                            title: village.name,
                            isLeaf: true,
                            expandable: false,
                            children: [],
                          })),
                        };
                      }
                      return innerBlockNode;
                    }),
                  };
                }
                return districtNode;
              }),
            };
          }
          return stateNode;
        });
        this.locationNodes = [...updatedNodes];
      },
      (error: any) => console.error('Error fetching villages:', error)
    );
  }

  loadStateNodes(globalNode: NzTreeNodeOptions): void {
    this.locationService.getbyStates(globalNode.key).subscribe(
      (states: any[]) => {
        this.locationNodes = this.locationNodes.map(node => {
          if (node.key === globalNode.key) {
            return {
              ...node,
              children: states.map(state => ({
                key: state._id,
                title: state.name,
                isLeaf: false,
                level: 'state',
                expandable: true,
                children: [],
              })),
            };
          }
          return node;
        });
      },
      (error: any) => console.error('Error fetching states:', error)
    );
  }

  loadDistrictNodes(globalNode: NzTreeNodeOptions): void {
    this.locationService.getdistricts(globalNode.key).subscribe(
      (districts: any[]) => {
        this.locationNodes = this.locationNodes.map(node => {
          if (node.key === globalNode.key) {
            return {
              ...node,
              children: districts.map(district => ({
                key: district._id,
                title: district.name,
                isLeaf: false,
                level: 'district',
                expandable: true,
                children: [],
              })),
            };
          }
          return node;
        });
      },
      (error: any) => console.error('Error fetching districts:', error)
    );
  }

  loadglobalBlocks(globalNode: NzTreeNodeOptions): void {
    this.locationService.getblocks(globalNode.key).subscribe(
      (blocks: any[]) => {
        this.locationNodes = this.locationNodes.map(node => {
          if (node.key === globalNode.key) {
            return {
              ...node,
              children: blocks.map(block => ({
                key: block._id,
                title: block.name,
                isLeaf: false,
                level: 'block',
                expandable: true,
                children: [],
              })),
            };
          }
          return node;
        });
      },
      (error: any) => console.error('Error fetching blocks:', error)
    );
  }

  loadglobalVillages(globalNode: NzTreeNodeOptions): void {
    this.locationService.getvillages(globalNode.key).subscribe(
      (villages: any[]) => {
        this.locationNodes = this.locationNodes.map(node => {
          if (node.key === globalNode.key) {
            return {
              ...node,
              children: villages.map(village => ({
                key: village._id,
                title: village.name,
                isLeaf: true,
                level: 'village',
                expandable: false,
                children: [],
              })),
            };
          }
          return node;
        });
      },
      (error: any) => console.error('Error fetching villages:', error)
    );
  }
}

