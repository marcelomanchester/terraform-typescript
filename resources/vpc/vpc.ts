import { Construct } from "constructs";
import { Subnet } from "../../.gen/providers/aws";
import { Vpc } from '../../.gen/providers/aws/vpc';
import { AwsProvider } from '../../.gen/providers/aws';
import { TerraformOutput, TerraformStack, Token } from "cdktf";

export class VpcStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        new AwsProvider(this, 'aws', {
            region: 'us-west-1'
        });

        const azs = ['us-west-1a', 'us-west-1b'];
        const subnetsCidrBlocks = ['10.0.2.0/24', '10.0.0.0/24'];

        const vpc = new Vpc(this, name, {
            cidrBlock: '10.0.0.0/16'
        });

        new TerraformOutput(this, 'vpc_id', {
            value: vpc.id
        });

        const subnetsIds = azs.map((az, index) => {
            const subnet = new Subnet(this, `${name}-${az}`, {
                availabilityZone: az,
                vpcId: Token.asString(vpc.id),
                cidrBlock: subnetsCidrBlocks[index]
            });

            return subnet.id;
        });

        new TerraformOutput(this, 'subnet_ids', {
            value: subnetsIds
        })
    }
}