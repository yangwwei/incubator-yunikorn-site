(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{184:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(2),o=n(9),i=(n(0),n(212)),a={id:"developer_guide",title:"Developer Guide"},c={id:"version-0.8.0/get_started/developer_guide",isDocsHomePage:!1,title:"Developer Guide",description:"\x3c!--",source:"@site/versioned_docs/version-0.8.0/get_started/developer_guide.md",permalink:"/docs/get_started/developer_guide",version:"0.8.0",sidebar:"version-0.8.0/docs",previous:{title:"User Guide",permalink:"/docs/get_started/user_guide"},next:{title:"Build Local",permalink:"/docs/setup/build_local"}},l=[{value:"Development Environment setup",id:"development-environment-setup",children:[]},{value:"Build YuniKorn for Kubernetes",id:"build-yunikorn-for-kubernetes",children:[{value:"Build Docker image",id:"build-docker-image",children:[]},{value:"Inspect the docker image",id:"inspect-the-docker-image",children:[]},{value:"Dependencies",id:"dependencies",children:[]}]},{value:"Build the web UI",id:"build-the-web-ui",children:[]},{value:"Locally run the integrated scheduler",id:"locally-run-the-integrated-scheduler",children:[]},{value:"Core component build",id:"core-component-build",children:[{value:"Build steps",id:"build-steps",children:[]}]},{value:"Design documents",id:"design-documents",children:[]}],u={rightToc:l};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"YuniKorn always works with a container orchestrator system. Currently, a Kubernetes shim ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/apache/incubator-yunikorn-k8shim"}),"yunikorn-k8shim"),"\nis provided in our repositories, you can leverage it to develop YuniKorn scheduling features and integrate with Kubernetes.\nThis document describes resources how to setup dev environment and how to do the development."),Object(i.b)("h2",{id:"development-environment-setup"},"Development Environment setup"),Object(i.b)("p",null,"Read the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/setup/env_setup"}),"environment setup guide")," first to setup Docker and Kubernetes development environment."),Object(i.b)("h2",{id:"build-yunikorn-for-kubernetes"},"Build YuniKorn for Kubernetes"),Object(i.b)("p",null,"Prerequisite:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Go 1.11+")),Object(i.b)("p",null,"You can build the scheduler for Kubernetes from ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/apache/incubator-yunikorn-k8shim"}),"yunikorn-k8shim")," project.\nThe build procedure will built all components into a single executable that can be deployed and running on Kubernetes."),Object(i.b)("p",null,"Start the integrated build process by pulling the ",Object(i.b)("inlineCode",{parentName:"p"},"yunikorn-k8shim")," repository:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"mkdir $HOME/yunikorn/\ncd $HOME/yunikorn/\ngit clone https://github.com/apache/incubator-yunikorn-k8shim.git\n")),Object(i.b)("p",null,"At this point you have an environment that will allow you to build an integrated image for the YuniKorn scheduler."),Object(i.b)("h3",{id:"build-docker-image"},"Build Docker image"),Object(i.b)("p",null,"Building a docker image can be triggered by following command."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"make image\n")),Object(i.b)("p",null,"The image with the build in configuration can be deployed directly on kubernetes.\nSome sample deployments that can be used are found under ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/apache/incubator-yunikorn-k8shim/tree/master/deployments/scheduler"}),"deployments")," directory.\nFor the deployment that uses a config map you need to set up the ConfigMap in kubernetes.\nHow to deploy the scheduler with a ConfigMap is explained in the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/setup/configure_scheduler"}),"scheduler configuration deployment")," document."),Object(i.b)("p",null,"The image build command will first build the integrated executable and then create the docker image.\nCurrently, there are some published docker images under ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://hub.docker.com/r/apache/yunikorn"}),"this docker hub repo"),", you are free to fetch and use.\nBut keep in mind, YuniKorn has no official release yet, the latest version image can only be used for testing or evaluating, do not use it in production.\nThe default image tags are not be suitable for deployments to an accessible repository as it uses a hardcoded user and would push to Docker Hub with proper credentials.\nYou ",Object(i.b)("em",{parentName:"p"},"must")," update the ",Object(i.b)("inlineCode",{parentName:"p"},"TAG")," variable in the ",Object(i.b)("inlineCode",{parentName:"p"},"Makefile")," to push to an accessible repository.\nWhen you update the image tag be aware that the deployment examples given will also need to be updated to reflect the same change."),Object(i.b)("h3",{id:"inspect-the-docker-image"},"Inspect the docker image"),Object(i.b)("p",null,"The docker image built from previous step has embedded some important build info in image's metadata. You can retrieve\nthese info with docker ",Object(i.b)("inlineCode",{parentName:"p"},"inspect")," command."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"docker inspect apache/yunikorn:scheduler-latest\n")),Object(i.b)("p",null,"these info includes git revisions (last commit SHA) for each component, to help you understand which version of the source code\nwas shipped by this image. They are listed as docker image ",Object(i.b)("inlineCode",{parentName:"p"},"labels"),", such as"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),'"Labels": {\n    "BuildTimeStamp": "2019-07-16T23:08:06+0800",\n    "Version": "0.1",\n    "yunikorn-core-revision": "dca66c7e5a9e",\n    "yunikorn-k8shim-revision": "bed60f720b28",\n    "yunikorn-scheduler-interface-revision": "3df392eded1f"\n}\n')),Object(i.b)("h3",{id:"dependencies"},"Dependencies"),Object(i.b)("p",null,"The dependencies in the projects are managed using ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://blog.golang.org/using-go-modules"}),"go modules"),".\nGo Modules require at least Go version 1.11 to be installed on the development system."),Object(i.b)("p",null,"If you want to modify one of the projects locally and build with your local dependencies you will need to change the module file.\nChanging dependencies uses mod ",Object(i.b)("inlineCode",{parentName:"p"},"replace")," directives as explained in the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/setup/build_local"}),"local build document"),"."),Object(i.b)("h2",{id:"build-the-web-ui"},"Build the web UI"),Object(i.b)("p",null,"Example deployments reference the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/apache/incubator-yunikorn-web"}),"YuniKorn web UI"),".\nThe YuniKorn web UI has its own specific requirements for the build. The project has specific requirements for the build follow the steps in the README to prepare a development environment and build how to build the projects.\nThe scheduler is fully functional without the web UI. "),Object(i.b)("h2",{id:"locally-run-the-integrated-scheduler"},"Locally run the integrated scheduler"),Object(i.b)("p",null,"When you have a local development environment setup you can run the scheduler in your local kubernetes environment.\nThis has been tested in a Docker desktop with docker for desktop and Minikube. See the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/setup/env_setup"}),"environment setup guide")," for further details."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"make run\n")),Object(i.b)("p",null,"It will connect with the kubernetes cluster using the users configured configuration located in ",Object(i.b)("inlineCode",{parentName:"p"},"$HOME/.kube/config"),"."),Object(i.b)("p",null,"You can also use the same approach to run the scheduler locally but connecting to a remote kubernetes cluster,\nas long as the ",Object(i.b)("inlineCode",{parentName:"p"},"$HOME/.kube/config")," file is pointing to that remote cluster."),Object(i.b)("h2",{id:"core-component-build"},"Core component build"),Object(i.b)("p",null,"The scheduler core, this repository build, by itself does not provide a functional scheduler.\nIt just builds the core scheduler functionality without any resource managers or shims.\nA functional scheduler must have at least one resource manager that registers."),Object(i.b)("h3",{id:"build-steps"},"Build steps"),Object(i.b)("p",null,"The core component contains two command line tools: the ",Object(i.b)("inlineCode",{parentName:"p"},"simplescheduler")," and the ",Object(i.b)("inlineCode",{parentName:"p"},"schedulerclient"),".\nThe two command line tools have been provided as examples only and are not supposed to implement all functionality."),Object(i.b)("p",null,"Building the example command line tools:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"make commands\n")),Object(i.b)("p",null,"Run all unit tests for the core component: "),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"make test\n")),Object(i.b)("p",null,"Any changes made to the core code should not cause any existing tests to fail."),Object(i.b)("p",null,"Running the lint tool over the current code:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"make lint\n")),Object(i.b)("p",null,"See the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/community/coding_guidelines"}),"coding guidelines documentation")," for more details. "),Object(i.b)("p",null,"As a utility target you can check that all files that must have a license have the correct license by running: "),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{}),"make common-check-license\n")),Object(i.b)("h2",{id:"design-documents"},"Design documents"),Object(i.b)("p",null,"All design documents are located in a central location per component. The core component design documents also contains the design documents for cross component designs.\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"design/README.md"}),"List of design documents")))}s.isMDXComponent=!0},212:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return h}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),s=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=s(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(n),p=r,h=d["".concat(a,".").concat(p)]||d[p]||b[p]||i;return n?o.a.createElement(h,c(c({ref:t},u),{},{components:n})):o.a.createElement(h,c({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var u=2;u<i;u++)a[u]=n[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);