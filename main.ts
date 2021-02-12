import { Construct } from 'constructs';
import { App, TerraformOutput, TerraformStack } from 'cdktf';
import { AwsProvider, Instance } from './.gen/providers/aws';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'aws', {
      region: 'us-west-1'
    });

    const instance = new Instance(this, 'main', {
      ami: 'ami-01456a894f71116f2',
      instanceType: 't2.micro',
      tags: {
        Name: 'Typescript-terraform'
      }
    });

    new TerraformOutput(this, 'public_ip', {
      value: instance.publicIp
    })

  }
}

const app = new App();
new MyStack(app, 'terraform-typescript');

// This command will generate a json wich can be used by terraform
app.synth();


