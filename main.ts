import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { VpcStack } from './resources/vpc/vpc';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    this.createVpc(scope);
  }

  createVpc(app: Construct) {
    new VpcStack(app, 'typescript')
  }
}

const app = new App();
new MyStack(app, 'main');

// This command will generate a json wich can be used by terraform
app.synth();


