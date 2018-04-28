import * as configuration from "../configuration";
import * as utilities from "../utilities";

export function getEngine(): (source: string) => Promise<string> {
    const dot = configuration.getNullableConfiguration<string>("dotPath", "dot");
    const args = ["-T", "svg"];

    return async (source: string) => {
        try {
            const [exitCode, stdout, stderr] = await utilities.runChildProcess(dot, args, source);

            if (exitCode === 0) {
                return stdout;
            } else {
                throw new Error(stderr.trim());
            }
        } catch (error) {
            if (error.code === "ENOENT") {
                throw new Error(`Program not found: “${dot}”.\nPlease check your configuration.`);
            } else {
                throw error;
            }
        }
    };
}
