# VELCRO

[![Video Label](http://img.youtube.com/vi/56pu6XN66_M/0.jpg)](https://youtu.be/56pu6XN66_M)

## TOOL COMPONENTS

![Tool_Component](https://github.com/HG-AISLAB/VELCRO/assets/50777504/17783954-615b-455e-bc8a-96d409d9625f)

### A. Layer Tab
The **Layer Tab** represents the types of layers that can be employed when constructing the deep learning architecture.
- **Types of layers**: Set based on the official PyTorch documentation and represented as a toggle.
- **Layers**: Become visible when pressing the type toggle and are color-coded according to their respective types.

### B. Abstract Tab
The **Abstract Tab** represents a feature to group the architecture configured by the user and its functionality is divided into auto-group and custom-group.
- **Auto-Group**: Automatically groups nodes and edges according to pre-defined levels (e.g., 3 levels in ResNet50) based on key architectural characteristics.
- **Custom-Group**: Allows users to manually group selected nodes and edges into specific grouping levels based on user-defined criteria.

### C. Layer Information
The **Layer Information** represents a feature to edit the hyperparameters of the layers that consist of the architecture.

### D. Workspace
The **Workspace** is a space for configuring architecture using the layers from the Layer Tab, and it offers functionalities such as Alignment, Architecture Validation, and Deep Learning Code Generation.
- **Alignment**: Vertically aligns the nodes in the workspace to provide a clear and organized view of the architecture.
- **Architecture Validation**: Displays the results of dimension compatibility validation between nodes in red and parameter variability validation in blue.
- **Deep Learning Code Generation**: Exports the user-configured architecture as a code file in a format supported by PyTorch (i.e., pth).

## HOW TO USE

### A. How to start
- **Docker and Docker-compose Installation**

      #system prerequisites
      sudo apt-get update
      sudo apt-get install ca-certificates curl gnupg lsb-release
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

      #install docker engine
      sudo apt-get update
      sudo apt-get install docker-ce docker-ce-cli containerd.io
      docker --version

      #install docker-compose
      sudo curl -L "https://github.com/docker/compose/releases/download/v2.6.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
      sudo chmod +x /usr/local/bin/docker-compose
      docker-compose --version
   
- **VELCRO repository clone**

      git clone https://github.com/HG-AISLAB/VELCRO.git

- **VELCRO image build and run**

      cd VELCRO
      docker-compose up -d --build

- **VELCRO in Web-browser**
  - Now you can launch web browser and open the URL `http://localhost:8091` or `http://aaa.bbb.ccc.ddd:8091`.
  - `aaa.bbb.ccc.ddd` is your host's DNS address or IP address.
    
### B. How to construct architecture

- **Add Node**: By dragging a layer node from the Layer Selection to Workspace, the desired node is created in the Workspace.
- **Connect Nodes**: By dragging the top or bottom points of a node to the points of another node, the edge is created between the two nodes.
- **Eliminate Node or Edge**: By clicking the target node or edge and pressing the backspace key, the target node is eliminated.

![How_to_use_1](https://github.com/HG-AISLAB/VELCRO/assets/50777504/651609e8-fdbf-40f8-9e52-0ed7b0c66dc8)

### C. **How to set hyper-parameter**

- By clicking the node in the workspace, you can see the layer information window located at the bottom. Then you can edit the value of hyper-parameters in each field.
- **Default button**: By clicking the default button located at the bottom-left of the layer information window, the value of hyper-parameters will be changed to the default value.
- **Save button**: By clicking the save button located at the bottom-right of the layer information window, the value of hyper-parameters will be saved to the database.

### D. How to scale & align

- **Scaling up & down**: By scrolling the mouse wheel upward, nodes and edges will zoom in for a magnified view. Conversely, by scrolling the mouse wheel downward, nodes and edges will zoom out to show a reduced size.
- **Architecture Alignment**: By clicking the Alignment button located in the bottom left of the Workspace, the nodes in the Workspace are aligned vertically.

### E. How to validate architecture & generate code

- **Architecture Validation**: By clicking the Inspect button located in the bottom right of the Workspace, the results of dimension compatibility between nodes are displayed in red, and parameter variability is displayed in blue.
- **Deep Learning Code Generation**: By clicking the Generate button located in the bottom right of the Workspace, a code file format (i.e., pth) of the constructed architecture is exported.

![How_to_use_2](https://github.com/HG-AISLAB/VELCRO/assets/50777504/8cefd0ff-5ed9-474d-b78e-e6ef39f04824)

### F. How to auto-group

- By clicking the level buttons, the user can group layers for the desired level.
- The information about abstracted layers can be found in the group information window.
- **Levels**
    - The higher the level, the more layers can be abstracted into groups.
    - For example, in the case of VGG-16, it can be grouped as follows.
        - Level 1: None of the nodes are represented as a group.
        - Level 2: The "Conv2d", "BatchNorm2d", and "ReLU" nodes are represented as a group.
        - Level 3: The "Conv2d", "BatchNorm2d", "ReLU", "Conv2d", "BatchNorm2d", "ReLU", and "MaxPool2d" are represented as one group. And "Conv2d", "BatchNorm2d", "ReLU", "Conv2d", "BatchNorm2d", "ReLU", "Conv2d", "BatchNorm2d", "ReLU", "MaxPool2d" is represented by another group.

### G. How to custom-group

- **How to group?**
    - Select nodes in the workspace and click the ‘Group’ button, the visualized architecture in the workspace automatically groups the chosen nodes and edges into the corresponding grouping level.
- **How to ungroup?**
    - Click the ‘Ungroup’ button in the Abstract Architecture Tab, and then the group will be ungrouped.

## Software Version
### v1.0.0
