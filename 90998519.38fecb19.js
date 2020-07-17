(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{181:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var o=n(2),r=n(9),a=(n(0),n(212)),c={id:"scheduler_core_design",title:"Scheduler Core Design"},i={id:"design/scheduler_core_design",isDocsHomePage:!1,title:"Scheduler Core Design",description:"\x3c!--",source:"@site/docs/design/scheduler_core_design.md",permalink:"/docs/next/design/scheduler_core_design",version:"next",sidebar:"docs",previous:{title:"Architecture",permalink:"/docs/next/design/architecture"},next:{title:"Cross Queue Preemption",permalink:"/docs/next/design/cross_queue_preemption"},latestVersionMainDocPermalink:"/docs"},l=[{value:"Overall",id:"overall",children:[]},{value:"Architecture",id:"architecture",children:[{value:"Components:",id:"components",children:[]}]},{value:"Configurations &amp; Semantics",id:"configurations--semantics",children:[]},{value:"How scheduler do allocation",id:"how-scheduler-do-allocation",children:[]},{value:"Flow of events inside YuniKorn-core",id:"flow-of-events-inside-yunikorn-core",children:[]}],s={rightToc:l};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"overall"},"Overall"),Object(a.b)("h2",{id:"architecture"},"Architecture"),Object(a.b)("h3",{id:"components"},"Components:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{}),"\n                     +---------------+  +--------------+\n                     |K8s Shim       |  |YARN Shim     |\n                     +---------------+  +--------------+\n\n                                +--------------+   +------------+\n                Scheduler-      | GRPC Protocol|   |Go API      |\n                Interface:      +--------------+   +------------+\n   +----------------------------- YuniKorn-Core -------------------------------+\n                        +--------------------+\n                        |    RMProxy         |\n                        +---------+----------+\n                                  |\n                                  |Write Ops                    +----------------+\n    +-------------+               V                            ++Scheduler       |\n    |ConfigWacher +        +---------------+    Allocate       ||   And          |\n    +-------------+        |Scheduler Cache|  <-----------------|                |\n            +----------\x3e   +---------------+    Preempt        ++Preemptor       |\n             Update Cfg           ^                             +----------------+\n                                  |\n                                  |\n              +-------------------+-------------------------+\n              |--------+ +------+ +----------+ +----------+ |\n              ||Node   | |Queue | |Allocation| |Requests  | |         +\n              |--------+ +------+ +----------+ +----------+ |\n              +---------------------------------------------+\n")),Object(a.b)("h4",{id:"rmproxy"},"RMProxy"),Object(a.b)("p",null,"Responsible for communication between RM and Scheduler, which implements scheduler-interface GRPC protocol, or just APIs. (For intra-process communication w/o Serde)."),Object(a.b)("h4",{id:"scheduler-cache"},"Scheduler Cache"),Object(a.b)("p",null,"Caches all data related to scheduler state, such as used resources of each queues, nodes, allocations. Relationship between allocations and nodes, etc."),Object(a.b)("p",null,"Should not include in-flight data for resource allocation. For example to-be-preempted allocation candidates. Fair share resource of queues, etc."),Object(a.b)("h4",{id:"configuration"},"Configuration"),Object(a.b)("p",null,"Handles configuration for YuniKorn scheduler, reload configuration, etc. ConfigWatcher is responsible for watching changes of config and reload the config, and ConfigValidator is responsible for validate if a config is valid or not."),Object(a.b)("h4",{id:"scheduler-and-preemptor"},"Scheduler and Preemptor"),Object(a.b)("p",null,"Handles Scheduler's internal state. (Which is not belong to scheduelr cache), such as internal reservations, etc. Scheduler and preemptor will work together, make scheduling or preemption decisions."),Object(a.b)("h5",{id:"schedulers-responsibility"},"Scheduler's responsibility"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"According to resource usages between queues, sort queues, applications, and figure out order of application allocation. (This will be used by preemption as well)."),Object(a.b)("li",{parentName:"ul"},"It is possible that we cannot satisfy some of the allocation request, we need to skip them and find next request."),Object(a.b)("li",{parentName:"ul"},"It is possible that some allocation request cannot be satisfied because of resource fragmentation. We need to reserve room for such requests."),Object(a.b)("li",{parentName:"ul"},"Different nodes may belong to different disjoint partitions, we can make independent scheduler runs"),Object(a.b)("li",{parentName:"ul"},"Be able to config and change ordering policies for apps, queues."),Object(a.b)("li",{parentName:"ul"},"Application can choose their own way to manage sort of nodes.")),Object(a.b)("h5",{id:"preemptors-responsibility"},"Preemptor's responsibility"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},'It is important to know "who wants the resource", so we can do preemption based on allocation orders.'),Object(a.b)("li",{parentName:"ul"},"When do preemption, it is also efficient to trigger allocation op. Think about how to do it."),Object(a.b)("li",{parentName:"ul"},"Preemption needs to take care about queue resource balancing.")),Object(a.b)("h4",{id:"eventhandler"},"EventHandler"),Object(a.b)("p",null,"All events exchange between RMProxy, Cache, Scheduler are handled by asynchonrized event handler."),Object(a.b)("h4",{id:"communication-between-shim-and-core"},"Communication between Shim and Core"),Object(a.b)("p",null,"YuniKorn-Shim (like ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/apache/incubator-yunikorn-k8shim"}),"https://github.com/apache/incubator-yunikorn-k8shim"),") communicates with core by using scheduler-interface (",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/apache/incubator-yunikorn-scheduler-interface"}),"https://github.com/apache/incubator-yunikorn-scheduler-interface"),"). Scheduler interface has Go API or GRPC. Currently, yunikorn-k8shim is using Go API to communicate with yunikorn-core to avoid extra overhead introduced by GRPC. "),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Shim (like K8shim) first need to register with core:")," "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-go"}),"func (m *RMProxy) RegisterResourceManager(request *si.RegisterResourceManagerRequest, callback api.ResourceManagerCallback) (*si.RegisterResourceManagerResponse, error)\n")),Object(a.b)("p",null,"Which indicate ResourceManager's name, a callback function for updateResponse. The design of core is be able to do scheduling for multiple clusters (such as multiple K8s cluster) just with one core instance."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Shim interacts with core by invoking RMProxy's Update API frequently, which updates new allocation request, allocation to kill, node updates, etc.")," "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-go"}),"func (m *RMProxy) Update(request *si.UpdateRequest) error\n")),Object(a.b)("p",null,"Response of update (such as new allocated container) will be received by registered callback."),Object(a.b)("h2",{id:"configurations--semantics"},"Configurations & Semantics"),Object(a.b)("p",null,"Please refer to ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"setup/configure_scheduler.md"}),"scheduler-configuration")," to better understand configuration."),Object(a.b)("h2",{id:"how-scheduler-do-allocation"},"How scheduler do allocation"),Object(a.b)("p",null,"Scheduler runs a separate goroutine to look at asks and available resources, and do resource allocation. Here's allocation logic in pseudo code: "),Object(a.b)("p",null,"Entry point of scheduler allocation is ",Object(a.b)("inlineCode",{parentName:"p"},"scheduler.go: func (s *Scheduler) schedule()")),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{}),"# First of all, YuniKorn has partition concept, a logical resource pool can consists\n# of one of multiple physical dis-joint partitions. It is similar to YARN's node\n# partition concept.\n\nfor partition : partitions:\n  # YuniKorn can reserve allocations for picky asks (such as large request, etc.)\n  # Before doing regular allocation, YuniKorn look at reservedAllocations first.\n  for reservedAllocation : partition.reservedAllocations: \n     reservedAllocation.tryAllocate(..)\n  \n  # After tried all reserved allocation, YuniKorn will go to regular allocation\n  partition.tryAllocate(..)\n  \n  # If there's any allocation created, scheduler will create an AllocationProposal\n  # and send to Cache to \"commit\" the AllocationProposal \n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Allocation by hierchical of queues")),Object(a.b)("p",null,"Inside ",Object(a.b)("inlineCode",{parentName:"p"},"partition.tryAllocate")," "),Object(a.b)("p",null,"It recursively traverse from root queue and down to lower level, for each level, logic is inside ",Object(a.b)("inlineCode",{parentName:"p"},"pkg/scheduler/scheduling_queue.go func (sq *SchedulingQueue) tryAllocate")),Object(a.b)("p",null,"Remember YuniKorn natively supports hierarchical of queues. For ParentQueue (which has sub queues under the parent queue), it uses queue's own sorting policy to sort subqueues and try to allocate from most preferred queue to least-preferred queue. "),Object(a.b)("p",null,"For LeafQueue (which has applications inside the queue), it uses queue's own sorting policy to sort applications belong to the queue and allocate based on the sorted order. "),Object(a.b)("p",null,"(All sorting policies can be configured differently at each level.) "),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Allocation by application")),Object(a.b)("p",null,"When it goes to Application, see (",Object(a.b)("inlineCode",{parentName:"p"},"scheduler_application.go: func (sa *SchedulingApplication) tryAllocate"),"), It first sort the pending resource requests belong to the application (based on requests' priority). And based on the selected request, and configured node-sorting policy, it sorts nodes belong to the partition and try to allocate resources on the sorted nodes. "),Object(a.b)("p",null,"When application trying to allocate resources on nodes, it will invokes PredicatePlugin to make sure Shim can confirm the node is good. (For example K8shim runs predicates check for allocation pre-check)."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Allocation completed by scheduler")," "),Object(a.b)("p",null,"Once allocation is done, scheduler will create an AllocationProposal and send to Cache to do further check, we will cover details in the upcoming section."),Object(a.b)("h2",{id:"flow-of-events-inside-yunikorn-core"},"Flow of events inside YuniKorn-core"),Object(a.b)("p",null,"Like mentioned before, all communications between components like RMProxy/Cache/Schedulers are done by using async event handler. "),Object(a.b)("p",null,"RMProxy/Cache/Scheduler include local event queues and event handlers. RMProxy and Scheduler have only one queue (For example: ",Object(a.b)("inlineCode",{parentName:"p"},"pkg/scheduler/scheduler.go: handleSchedulerEvent"),"), and Cache has two queues (One for events from RMProxy, and one for events from Scheduler, which is designed for better performance). "),Object(a.b)("p",null,"We will talk about how events flowed between components: "),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Events for ResourceManager registration and updates:")),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{}),"Update from ResourceManager -> RMProxy -> RMUpdateRequestEvent Send to Cache\nNew ResourceManager registration -> RMProxy -> RegisterRMEvent Send to Cache\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Cache Handles RM Updates")," "),Object(a.b)("p",null,"There're many fields inside RM Update event (",Object(a.b)("inlineCode",{parentName:"p"},"RMUpdateRequestEvent"),"), among them, we have following categories: "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{}),"1) Update for Application-related updates\n2) Update for New allocation ask and release. \n3) Node (Such as kubelet) update (New node, remove node, node resource change, etc.)\n")),Object(a.b)("p",null,"More details can be found at: "),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{}),"func (m *ClusterInfo) processRMUpdateEvent(event *cacheevent.RMUpdateRequestEvent)\n\ninside cluster_info.go\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Cache send RM updates to Scheduler")),Object(a.b)("p",null,"For most cases, Cache propagate updates from RM to scheduler directly (including Application, Node, Asks, etc.). And it is possible that some updates from RM is not valid (such as adding an application to a non-existed queue), for such cases, cache can send an event back to RMProxy and notify the ResourceManager. (See ",Object(a.b)("inlineCode",{parentName:"p"},"RMApplicationUpdateEvent.RejectedApplications"),")"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Cache handles scheduler config")," "),Object(a.b)("p",null,"Cache also handles scheduler's config changes, see"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-go"}),"func (m *ClusterInfo) processRMConfigUpdateEvent(event *commonevents.ConfigUpdateRMEvent)\n")),Object(a.b)("p",null,"Similar to other RM updates, it propages news to scheduelr."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Scheduler do allocation")),Object(a.b)("p",null,"Once an AllocationProposal created by scheduler, scheduler sends ",Object(a.b)("inlineCode",{parentName:"p"},"AllocationProposalBundleEvent")," to Cache to commit. "),Object(a.b)("p",null,"Cache look at AllocationProposal under lock, and commit these proposals. The reason to do proposal/commit is Scheduler can run in multi-threads which could cause conflict for resource allocation. This approach is inspired by Borg/Omega/YARN Global Scheduling."),Object(a.b)("p",null,"Cache checks more states such as queue resources, node resources (we cannot allocate more resource than nodes' available), etc. Once check is done, Cache updates internal data strcture and send confirmation to Scheduler to update the same, and scheduler sends allocated Allocation to RMProxy so Shim can do further options. For example, K8shim will ",Object(a.b)("inlineCode",{parentName:"p"},"bind")," an allocation (POD) to kubelet."))}u.isMDXComponent=!0},212:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return h}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),u=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=u(n),b=o,h=d["".concat(c,".").concat(b)]||d[b]||p[b]||a;return n?r.a.createElement(h,i(i({ref:t},s),{},{components:n})):r.a.createElement(h,i({ref:t},s))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var s=2;s<a;s++)c[s]=n[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);